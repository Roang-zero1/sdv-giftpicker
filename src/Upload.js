import React, { Component } from 'react';
import { Button } from 'reactstrap';
import $ from 'jquery';
import './Upload.css';

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
        console.log('XML doc parsed ' + xmlDoc.documentElement);
      } catch (err) {
        // TODO: Show an error message to the user
        console.log('Failed to parse file');
      }
    };

    reader.readAsText(file);
  }
}

export default Upload;
