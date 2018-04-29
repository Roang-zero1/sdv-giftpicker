import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Navbar, NavbarToggler } from 'reactstrap';

import * as navigationActions from '../actions/navigationActions';

import Upload from './Upload';
import NoSaveButton from './NoSaveButton';

import './Navigation.css';

/* TODO: Fix buttons on right side for small layouts e.g. dropdown after md */
class Navigation extends Component {
  render() {
    return (
      <Navbar sticky="top" dark color="dark">
        <NavbarToggler
          onClick={this.props.navigationActions.toggleSidebar}
          className="mr-2"
        />
        <Link to="/" className="navbar-brand">
          <img src={require('../images/Logo.png')} alt="SDV-GP" />
        </Link>
        <div className="inline">
          <Upload inline={true} text="Re-Upload" className="mr-1" />
          <NoSaveButton inline={true} />
        </div>
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
