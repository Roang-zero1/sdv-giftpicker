import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Navbar, NavbarBrand, NavbarToggler } from 'reactstrap';

import * as statusActions from '../actions/statusActions';

import Upload from './Upload';

import './Navigation.css';

class Navigation extends Component {
  render() {
    return (
      <Navbar sticky="top" dark color="dark">
        <NavbarToggler
          onClick={this.props.statusActions.toggleSidebar}
          className="mr-2"
        />
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

function mapDispatchToProps(dispatch) {
  return {
    statusActions: bindActionCreators(statusActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
