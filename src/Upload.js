import React, { Component } from 'react';
import { Button } from 'reactstrap';
import $ from 'jquery';
import './Upload.css';

class Upload extends Component {
  constructor(props){
    super(props)
    this.handleUpdload = this.handleUpdload.bind(this)
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
          className="btn-lg"
          onClick={() => {
            this.upload.click();
          }}
        >
          Upload File
        </Button>
      </div>
    );
  }

  handleUpdload(event) {
    var file = event.target.files[0];
    var reader = new FileReader();

    const updateProgress = this.props.onProgressChange

    console.log('Reading file');

    reader.onloadstart = function(e) {
      updateProgress(20, "Loading file")
    };

    reader.onprogress = function(e) {
      if (e.lengthComputable) {
        var p = 20 + e.loaded / e.total * 60;
        updateProgress(20, "Loading file")
      }
    };

    reader.onload = function(e) {
      updateProgress(100, "Loading file")
      console.log('file loaded' + e.target.result);
    };

    reader.readAsText(file);
  }
}

export default Upload;
