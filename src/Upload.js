import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as itemsActions from './actions/itemActions';
import * as statusActions from './actions/statusActions';
import * as charactersActions from './actions/charactersActions';
import $ from 'jquery';
import './Upload.css';
import giftIDs from './data/Gifts.js';

class Upload extends Component {
  constructor(props) {
    super(props);
    this.handleUpload = this.handleUpload.bind(this);
  }
  render(props) {
    return (
      <div>
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
          size="lg"
          onClick={() => {
            this.upload.click();
          }}
          disabled={this.props.disabled}
        >
          {this.props.dis}
          Upload File
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
          console.log('Failed to update data for ' + who + '\n' + err);
        }
      });
  }

  handleUpload(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    const instance = this;

    this.props.statusActions.setLoaded(false);

    reader.onloadstart = function(e) {
      instance.props.statusActions.setProgress(10, 'Loading file');
    };

    reader.onprogress = function(e) {
      if (e.lengthComputable) {
        var p = 10 + e.loaded / e.total * 40;
        instance.props.statusActions.setProgress(p, 'Loading file');
      }
    };

    reader.onload = function(e) {
      instance.props.statusActions.setProgress(55, 'Parsing data');
      try {
        var xmlDoc = $.parseXML(e.target.result);
        instance.gatherItems.call(instance, xmlDoc);
        instance.props.statusActions.setProgress(90, 'Parsing data');
        instance.findGiftCount.call(instance, xmlDoc);
        instance.props.statusActions.setProgress(100, 'Finished loading');
        console.log('XML doc parsed ' + xmlDoc.documentElement);
        instance.props.statusActions.setLoaded();
      } catch (err) {
        // TODO: Show an error message to the user
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
