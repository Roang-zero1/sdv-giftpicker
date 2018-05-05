import './Loader.css';

import React, { Component } from 'react';

import { Container } from 'reactstrap';

class Loader extends Component {
  render() {
    return (
      <Container className={'loader-wrapper'}>
        <h2>Loading</h2>
        <p>Loading Data please wait</p>
        <div className={'loader'} />
      </Container>
    );
  }
}

export default Loader;
