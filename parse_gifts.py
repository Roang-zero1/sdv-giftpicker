#!./bin/python
"""Stardew Valley giftdata parser

Usage:
    parse_gifts.py [-v]
    parse_gifts.py (-h | --help)

Options:
    -h --help       Show this screen.
    --version       Show this screen.
    -v --verbose    Enable debug output

"""
import copy
import json
import logging
import os
import re
import urllib.parse
from collections import defaultdict

import yaml
from docopt import docopt

logger = logging.getLogger()


def parse_yaml_file(filename):
    """Parse a yaml file and return the content as dict"""
    try:
        with open(filename, 'r') as infofile:
            try:
                content = yaml.load(infofile)
            except yaml.YAMLError as exc:
                logger.fatal(
                    "Failed to parse %s with exception: %s", filename, exc)
                exit(1)
            return content['content']
    except FileNotFoundError as exc:
        logger.fatal("Could not find import file %s", filename)
        exit(1)


def load_item_data():
    """Load the Stardew Valley item data from the exported game file."""
    logger.info("Reading itemdata from file.")
    items_data = parse_yaml_file('ObjectInformation.yaml')
    logger.debug("Itemdata file read")

    categories = defaultdict(lambda: defaultdict(list))
    items = {}

    regex = re.compile(
        r'(.*?)/(\d*)/.*?/([A-Za-z ]*)(\s([0-9\-]*))*/.*')
    for itemid, itemdata in items_data.items():
        match = regex.match(itemdata)

        catid = None
        if match.group(4):
            catid = int(match.group(5))
        elif match.group(3) == "Arch":
            catid = 0

        if catid:
            display_name = match.group(1)
            name = display_name.replace(' ', '_').replace('.', '')
            name = urllib.parse.quote(name)
            items[itemid] = {
                'price': int(match.group(2)),
                'displayname': display_name,
                'name': name,
                'cat': catid
            }
            categories[catid]['name'] = match.group(3)
            categories[catid]['items'].append(int(itemid))
    items[180]['displayname'] = 'Brown_Egg'
    items[182]['displayname'] = 'Large_Brown_Egg'

    logger.debug("Finished parsing item data")

    return (categories, items)

def load_gift_data():
    pass


def main():
    logger.info("Read category data from file.")

    data, itemsdict = load_item_data()
    try:

        logger.info("Read gift data from file")

        with open('NPCGiftTastes.yaml', 'r') as infofile:
            try:
                content = yaml.load(infofile)
            except yaml.YAMLError as exc:
                logger.fatal(exc)
        rawdata = content['content']

        levels = [
            ('Love', 0),
            ('Like', 1),
            ('Dislike', 2),
            ('Hate', 3),
            ('Neutral', 4)
        ]

        tastes = {
            "universal": {
                "cats": {},
                "items": {}
            }
        }
        logger.info("Calculating universal likes")
        for cat, level in levels:

            values = rawdata.pop(
                "Universal_{}".format(cat), None).split()
            tastes['universal']['cats'] = {
                **tastes['universal']['cats'],
                **{int(el): level for el in [v for v in values if int(v) < 0]}
            }
            tastes['universal']['items'] = {
                **tastes['universal']['items'],
                **{int(el): level for el in [v for v in values if int(v) > 0]}
            }

        regex = re.compile(r'.+?/(.*?)/')
        for person, taste in rawdata.items():
            logger.info("Calculating likes for %s", person)
            tastes[person] = copy.deepcopy(tastes['universal'])
            taste = regex.findall(taste)
            taste = [v.split() for v in taste]
            for _, level in levels:
                if taste[level]:
                    tastes[person]['cats'] = {
                        **tastes[person]['cats'],
                        **{int(el): level for el in [v for v in taste[level] if int(v) < 0]}
                    }
                    tastes[person]['items'] = {
                        **tastes[person]['items'],
                        **{int(el): level for el in [v for v in taste[level] if int(v) > 0]}
                    }
        logger.info("Writing likes to file")

        logger.info("Begin data association")
        del tastes['universal']
        itemtastes = {}
        itemtastes_bylevel = {}
        gifts = []
        for person, taste in tastes.items():
            categories = set(data.keys()).intersection(taste['cats'].keys())
            items = {
                **{itemid: taste['cats'][catid]
                   for catid in categories for itemid in data[catid]['items']},
                **taste['items']}
            itemtastes[person] = items
        for person in itemtastes:
            itemtastes[person] = {
                k: v for k, v in itemtastes[person].items() if v < 2 or v == 4}
            gifts += itemtastes[person].keys()
            for itemid in itemtastes[person]:
                level = itemtastes[person][itemid]
                if person not in itemtastes_bylevel:
                    itemtastes_bylevel[person] = {}
                if level not in itemtastes_bylevel[person]:
                    itemtastes_bylevel[person][level] = []
                itemtastes_bylevel[person][level].append(itemid)

        gifts = sorted(set(gifts))
        print(itemtastes_bylevel)

        itemsdict = {k: v for k, v in itemsdict.items() if k in gifts}
        with open(os.path.join('public', 'GiftsData.json'), 'w') as outfile:
            json.dump(itemsdict, outfile, sort_keys=True)
            outfile.write('\n')
        with open(os.path.join('public', 'GiftTastes.json'), 'w') as outfile:
            json.dump(itemtastes_bylevel, outfile, sort_keys=True)
            outfile.write('\n')

    except FileNotFoundError as exc:
        logger.fatal(exc)


if __name__ == "__main__":
    OPTS = docopt(__doc__, version='Stardew Valley giftdata parser 1.0')
    logging.basicConfig(level=logging.DEBUG if OPTS['--verbose'] else logging.INFO)
    main()
