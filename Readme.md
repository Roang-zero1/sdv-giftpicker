# Stardew Valley Gift Chooser

**This repository is archived**

[![Greenkeeper badge](https://badges.greenkeeper.io/Roang-zero1/sdv-giftpicker.svg)](https://greenkeeper.io/)

This is an app that checks a uploaded save file for the game Stardew Valley and reports the gifts that you may give to the other characters.
Only gifts you actually own are shown.

The app is written in Javascript and python, it is hosted on GitHub Pages at https://roang-zero1.github.io/sdv-giftpicker/ and the source code repository is https://github.com/Roang-zero1/sdv-giftpicker/. It is released under the MIT license.

Furthermore the app reuses parts of the code used in the [stardew-checkup](https://github.com/MouseyPounds/stardew-checkup) app

## Generating Gift List
Using XNBExtract (https://community.playstarbound.com/threads/beginners-guide-to-xnb-node-and-graphics-editing.110976/) to extract the Data of the NPCGiftTastes.yaml and ObjectInformation.yaml files.

Generate the gift list using the parse_gifts.py python file.

## TODO

* Switch to [xnbcli](https://github.com/LeonBlade/xnbcli)
* Parse json instead of yaml
