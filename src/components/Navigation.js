import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Navbar, NavbarBrand } from 'reactstrap';

import Upload from './Upload';

import './Navigation.css';

class Navigation extends Component {
  render() {
    return (
      <Navbar>
        <NavbarBrand>
          <img src={require('../images/Logo.png')} alt="SDV-GP" />
        </NavbarBrand>
        <Upload inline={true} text="Re-Upload" />
      </Navbar>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.status
  };
}

export default connect(mapStateToProps)(Navigation);
