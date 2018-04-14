import React, { Component } from 'react';
import { Button } from 'reactstrap';
import $ from 'jquery';
import './Upload.css';

class Upload extends Component {
  render(props) {
    return (
      <div>
        <input
          type="file"
          id="upload"
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

export default Upload;
