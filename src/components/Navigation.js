import './Navigation.css';

import * as navigationActions from '../actions/navigationActions';

import { Navbar, NavbarToggler } from 'reactstrap';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import NoSaveButton from './NoSaveButton';
import Upload from './Upload';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

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
          <Upload
            inline={true}
            text={this.props.status.save ? 'Re-Upload' : 'Upload save'}
            className="mr-1"
          />
          {this.props.status.save && <NoSaveButton inline={true} />}
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
