import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Navbar, NavbarBrand, NavbarToggler, NavLink } from 'reactstrap';

import * as navigationActions from '../actions/navigationActions';

import Upload from './Upload';

import './Navigation.css';

class Navigation extends Component {
  render() {
    return (
      <Navbar sticky="top" dark color="dark">
        <NavbarToggler
          onClick={this.props.navigationActions.toggleSidebar}
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
    navigationActions: bindActionCreators(navigationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
