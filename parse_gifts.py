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
        with open(filename, 'r') as input_file:
            try:
                content = yaml.load(input_file)
                logger.debug("%s read", filename)
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
    logger.info("Reading item data from file.")
    items_data = parse_yaml_file('ObjectInformation.yaml')

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
        elif match.group(1):
            catid = 1

        if catid != None:
            display_name = match.group(1)
            name = display_name.replace(' ', '_').replace(
                '.', '').replace("'", '')
            name = urllib.parse.quote(name)
            items[itemid] = {
                'price': int(match.group(2)),
                'displayName': display_name,
                'name': name,
                'cat': catid
            }
            categories[catid]['name'] = match.group(3)
            categories[catid]['items'].append(int(itemid))
    items[180]['displayName'] = 'Brown_Egg'
    items[182]['displayName'] = 'Large_Brown_Egg'

    logger.debug("Finished parsing item data")

    return (categories, items)


def load_gift_data():
    """Load the Stardew Valley gift taste data from the exported game file."""
    logger.info("Reading gift data from file.")
    gift_data = parse_yaml_file('NPCGiftTastes.yaml')

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

    logger.debug("Calculating universal likes")

    for cat, level in levels:
        values = gift_data.pop(
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

    for person, taste in gift_data.items():
        logger.debug("Calculating likes for %s", person)
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
    logger.info("Finished parsing gift data.")
    return tastes


def main():
    """Main Method

    Initiates the data loading and associates the data
    """
    logger.info("Read category data from file.")

    cat_data, items_data = load_item_data()
    tastes = load_gift_data()

    logger.info("Begin data association")
    del tastes['universal']
    itemtastes = defaultdict(lambda: defaultdict(list))
    gifts = []
    for person, taste in tastes.items():
        categories = set(cat_data.keys()).intersection(taste['cats'].keys())
        items = {
            **{itemid: taste['cats'][catid]
               for catid in categories for itemid in cat_data[catid]['items']},
            **taste['items']}
        items = {k: v for k, v in items.items() if (
            v < 2 or v == 4) and k in items_data.keys()}
        gifts += items.keys()

        for itemid, level in items.items():
            itemtastes[person][level].append(itemid)

    gifts = sorted(set(gifts))

    items_data = {k: v for k, v in items_data.items() if k in gifts}
    with open(os.path.join('src', 'data', 'GiftsData.js'), 'w') as outfile:
        outfile.write("export default ")
        json.dump(items_data, outfile, sort_keys=True)
        outfile.write(";\n")
    with open(os.path.join('src', 'data', 'GiftTastes.js'), 'w') as outfile:
        outfile.write("export default ")
        json.dump(itemtastes, outfile, sort_keys=True)
        outfile.write(";\n")


if __name__ == "__main__":
    OPTS = docopt(__doc__, version='Stardew Valley giftdata parser 1.0')
    logging.basicConfig(
        level=logging.DEBUG if OPTS['--verbose'] else logging.INFO)
    main()
