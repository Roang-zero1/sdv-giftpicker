import copy
import json
import logging
import re

import yaml

logger = logging.getLogger()


def main():
    logger.info("Read category data from file.")
    try:
        with open('ObjectInformation.yaml', 'r') as infofile:
            try:
                content = yaml.load(infofile)
                items = content['content']
                data = {}
                regex = re.compile(
                    r'(.*?)/(.*?/){2}([A-Za-z ]*)(\s([0-9\-]*))*/.*')
                for itemid, itemdata in items.items():
                    m = regex.match(itemdata)
                    if m.group(4):
                        catid = int(m.group(5))
                        data[catid] = data.get(catid, {})
                        data[catid]['name'] = m.group(3)
                        data[catid]['items'] = data[catid].get('items', [])
                        data[catid]['items'].append(int(itemid))
            except yaml.YAMLError as exc:
                print(exc)
        logger.info("Read gift data from file")

        with open('NPCGiftTastes.yaml', 'r') as infofile:
            try:
                content = yaml.load(infofile)
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
                    logger.info("Calculating likes for {}".format(person))
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
            except yaml.YAMLError as exc:
                logger.fatal(exc)

        logger.info("Begin data association")
        del(tastes['universal'])
        itemtastes = {}
        for person, taste in tastes.items():
            categories = set(data.keys()).intersection(taste['cats'].keys())
            items = {
                **{itemid: taste['cats'][catid]
                   for catid in categories for itemid in data[catid]['items']},
                       **taste['items']}
            itemtastes[person] = items
            print("{}: {}".format(person, len(items)))
        for person in itemtastes:
            itemtastes[person] = {k: v for k, v in itemtastes[person].items() if v < 2 or v == 4}
        with open('NPCGiftTastes.json', 'w') as outfile:
            json.dump(itemtastes, outfile, indent=2, sort_keys=True)
    except FileNotFoundError as exc:
        logger.fatal(exc)


if __name__ == "__main__":
    logging.basicConfig(level=logging.DEBUG)
    main()
