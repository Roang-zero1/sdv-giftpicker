import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as itemsActions from './actions/itemActions';
import * as statusActions from './actions/statusActions';
import $ from 'jquery';
import './Upload.css';
import giftIDs from './data/Gifts.js';

function findGiftCount(xmlDoc) {
  var charactersData = {};
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
        charactersData[who] = num;
      } catch (err) {
        console.log('Failed to update data for ' + who + '\n' + err);
      }
    });
  return charactersData;
}

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
    const incrementItemCount = this.props.itemsActions.incrementItemCount;
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
          if (id in giftIDs) {
            var count = parseInt(
              $(this)
                .find('Stack')
                .text(),
              10
            );
            incrementItemCount(id, count);
          }
        } catch (err) {
          console.log('Failed to get item count for ' + id);
        }
      });
  }

  gatherItems(xmlDoc) {
    this.parseItems(xmlDoc, 'player > items > Item[xsi\\:type="Object"]');
    this.parseItems(
      xmlDoc,
      'locations > GameLocation[xsi\\:type="FarmHouse"] > fridge > items > Item[xsi\\:type="Object"]'
    );
    this.parseItems(
      xmlDoc,
      'Object[xsi\\:type="Chest"] > items > Item[xsi\\:type="Object"]'
    );
  }

  handleUpload(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    const updateProgress = this.props.onProgressChange;
    const onFileLoaded = this.props.onFileLoaded;
    const instance = this;

    reader.onloadstart = function(e) {
      updateProgress(10, 'Loading file');
    };

    reader.onprogress = function(e) {
      if (e.lengthComputable) {
        var p = 10 + e.loaded / e.total * 40;
        updateProgress(p, 'Loading file');
      }
    };

    reader.onload = function(e) {
      updateProgress(55, 'Parsing data');
      try {
        var xmlDoc = $.parseXML(e.target.result);
        instance.props.itemsActions.resetItemCounts();
        instance.gatherItems.call(instance, xmlDoc);
        updateProgress(90, 'Parsing data');
        var charactersData = findGiftCount(xmlDoc);
        updateProgress(100, 'Finished loading');
        console.log('XML doc parsed ' + xmlDoc.documentElement);
        onFileLoaded(charactersData);
        instance.props.statusActions.setLoaded();
      } catch (err) {
        // TODO: Show an error message to the user
        console.log('Failed to parse file');
        console.log(err);
      }
    };

    reader.readAsText(file);
  }
}

function mapStateToProps(state) {
  return {
    items: state.items
  };
}

function mapDispatchToProps(dispatch) {
  return {
    itemsActions: bindActionCreators(itemsActions, dispatch),
    statusActions: bindActionCreators(statusActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
