import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { Button } from 'reactstrap';
import $ from 'jquery';

import giftIDs from '../data/Gifts.js';

import * as itemsActions from '../actions/itemActions';
import * as statusActions from '../actions/statusActions';
import * as charactersActions from '../actions/charactersActions';

import './Upload.css';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }
  render(props) {
    return (
      <div className={classNames({ inline: this.props.inline })}>
        <input
          type="file"
          id="upload"
          onChange={this.handleUpload}
          ref={upload => {
            this.upload = upload;
          }}
        />
        <Button
          color="primary"
          size={this.props.inline ? 'sm' : 'lg'}
          onClick={() => {
            this.upload.click();
          }}
          disabled={this.props.disabled}
          className={this.props.className}
        >
          {this.props.text ? this.props.text : 'Upload save-game'}
        </Button>
      </div>
    );
  }

  parseItems(xmlDoc, searchString) {
    const items = this.items;
    $(xmlDoc)
      .find(searchString)
      .each(function() {
        try {
          var id = parseInt(
            $(this)
              .find('parentSheetIndex')
              .text(),
            10
          );
          if (giftIDs.includes(id)) {
            var count = parseInt(
              $(this)
                .find('Stack')
                .text(),
              10
            );
            items[id] = (items[id] || 0) + count;
          }
        } catch (err) {
          // TODO: Add proper error handling
          console.log('Failed to get item count for ' + id);
        }
      });
  }

  gatherItems(xmlDoc) {
    this.items = {};
    this.parseItems(xmlDoc, 'player > items > Item[xsi\\:type="Object"]');
    this.parseItems(
      xmlDoc,
      'locations > GameLocation[xsi\\:type="FarmHouse"] > fridge > items > Item[xsi\\:type="Object"]'
    );
    this.parseItems(
      xmlDoc,
      'Object[xsi\\:type="Chest"] > items > Item[xsi\\:type="Object"]'
    );
    this.props.itemsActions.updateItems(this.items);
    delete this.items;
  }

  findGiftCount(xmlDoc) {
    const setGiftCount = this.props.charactersActions.setGiftCount;
    $(xmlDoc)
      .find('player > friendships > item')
      .each(function() {
        try {
          var who = $(this)
            .find('key > string')
            .html();
          var num = parseInt(
            $(this)
              .find('value > ArrayOfInt > int')
              .first()
              .next()
              .text(),
            10
          );
          setGiftCount(who, num);
        } catch (err) {
          // TODO: Add proper error handling
          console.log('Failed to update data for ' + who + '\n' + err);
        }
      });
  }

  handleUpload(event) {
    var target = event.target;
    var file = event.target.files[0];
    var reader = new FileReader();

    const instance = this;

    reader.onloadstart = function(e) {
      instance.props.statusActions.setLoading(true);
    };

    reader.onprogress = function(e) {
      if (e.lengthComputable) {
        instance.props.statusActions.setLoading(true);
      }
    };

    reader.onload = function(e) {
      instance.props.statusActions.setLoading(true);
      try {
        var xmlDoc = $.parseXML(e.target.result);
        instance.gatherItems.call(instance, xmlDoc);
        instance.props.statusActions.setLoading(true);
        instance.findGiftCount.call(instance, xmlDoc);
        instance.props.statusActions.setLoading(true);
        instance.props.statusActions.setLoading(false);
        instance.props.statusActions.setSaveGame(true);
        instance.props.statusActions.setIntroChosen(true);
        target.value = '';
      } catch (err) {
        // TODO: Add proper error handling
        console.log('Failed to parse file');
      }
    };

    reader.readAsText(file);
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    itemsActions: bindActionCreators(itemsActions, dispatch),
    statusActions: bindActionCreators(statusActions, dispatch),
    charactersActions: bindActionCreators(charactersActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
