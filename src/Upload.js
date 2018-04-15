import React, { Component } from 'react';
import { Button } from 'reactstrap';
import $ from 'jquery';
import './Upload.css';

function parseItems(xmlDoc, items, searchString) {
  $(xmlDoc)
    .find(searchString)
    .each(function() {
      var id = parseInt(
        $(this)
          .find('parentSheetIndex')
          .text(),
        10
      );
      if (id in items) {
        var count = parseInt(
          $(this)
            .find('Stack')
            .text(),
          10
        );
        items[id].count = (items[id].count || 0) + count;
      }
    });
}

function gatherItems(xmlDoc, items) {
  parseItems(xmlDoc, items, 'player > items > Item[xsi\\:type="Object"]');
  parseItems(
    xmlDoc,
    items,
    'locations > GameLocation[xsi\\:type="FarmHouse"] > fridge > items > Item[xsi\\:type="Object"]'
  );
  parseItems(
    xmlDoc,
    items,
    'Object[xsi\\:type="Chest"] > items > Item[xsi\\:type="Object"]'
  );
  return items;
}

class Upload extends Component {
  constructor(props) {
    super(props);
    this.handleUpdload = this.handleUpdload.bind(this);
  }
  render(props) {
    return (
      <div>
        <input
          type="file"
          id="upload"
          onChange={this.handleUpdload}
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

  handleUpdload(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    const updateProgress = this.props.onProgressChange;
    const onFileLoaded = this.props.onFileLoaded;
    const props = this.props;

    reader.onloadstart = function(e) {
      updateProgress(20, 'Loading file');
    };

    reader.onprogress = function(e) {
      if (e.lengthComputable) {
        var p = 20 + e.loaded / e.total * 60;
        updateProgress(p, 'Loading file');
      }
    };

    reader.onload = function(e) {
      updateProgress(100, 'Loading file');
      try {
        var xmlDoc = $.parseXML(e.target.result);
        var items = gatherItems(xmlDoc, props.giftsData);
        console.log('XML doc parsed ' + xmlDoc.documentElement);
        onFileLoaded(items);
      } catch (err) {
        // TODO: Show an error message to the user
        console.log('Failed to parse file');
        console.log(err);
      }
    };

    reader.readAsText(file);
  }
}

export default Upload;
