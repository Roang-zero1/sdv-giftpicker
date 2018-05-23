import './Sidebar.css';

import * as navigationActions from '../actions/navigationActions';

import { Nav, NavItem } from 'reactstrap';
import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { connect } from 'react-redux';
import tastes from '../data/GiftTastes';

class Sidebar extends Component {
  render() {
    let charactersLinks = [];
    for (var char in this.props.characters) {
      if (char in tastes && this.props.characters[char].gifts < 2) {
        charactersLinks.push(
          <NavItem
            key={char}
            className={
              this.props.navigation.selection === char ? 'active' : null
            }
          >
            <Link className="nav-link" to={`/character/${char}`}>
              <img
                className="icon"
                src={require('../images/characters/' + char + '.png')}
                alt=""
              />{' '}
              <span
                className={classNames({
                  'd-md-inline': true,
                  'd-none': true
                })}
              >
                {char}
              </span>
            </Link>
          </NavItem>
        );
      }
    }
    return (
      <div id="sidebar" className="bg-dark">
        <Nav
          vertical
          className={classNames({
            'flex-column': true,
            in: true
          })}
        >
          <NavItem key="overview">
            <Link className="nav-link" to="/">
              <img
                className="icon"
                src={require('../images/th-list.png')}
                alt=""
              />{' '}
              <span
                className={classNames({
                  'd-md-inline': true,
                  'd-none': true
                })}
              >
                Overview
              </span>
            </Link>
          </NavItem>
          {charactersLinks}
        </Nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    characters: state.characters,
    navigation: state.navigation
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigationActions: bindActionCreators(navigationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
