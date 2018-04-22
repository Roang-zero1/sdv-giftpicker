import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import $ from 'jquery';

import { Nav, NavItem, NavLink } from 'reactstrap';

import * as navigationActions from '../actions/navigationActions';

import tastes from '../data/GiftTastes.js';

import './Sidebar.css';

class Sidebar extends Component {
  constructor(props) {
    super(props);
    this.selectCharacter = this.selectCharacter.bind(this);
  }

  render() {
    let characters_links = [];
    for (var char in tastes) {
      if (
        char in this.props.characters &&
        this.props.characters[char].gifts < 2
      ) {
        characters_links.push(
          <NavItem
            key={char}
            className={
              this.props.navigation.selection === char ? 'active' : null
            }
          >
            <NavLink
              href={'#' + char}
              data-char={char}
              onClick={this.selectCharacter}
            >
              <img
                className="icon"
                src={require('../images/characters/' + char + '.png')}
                alt=""
              />{' '}
              <span
                className={classNames({
                  'd-none': true,
                  'd-md-inline': true
                })}
              >
                {char}
              </span>
            </NavLink>
          </NavItem>
        );
      }
    }
    return (
      <div id="sidebar" className="bg-dark">
        <Nav
          vertical
          className={classNames({
            in: true,
            'flex-column': true
          })}
        >
          <NavItem key="overview">
            <NavLink
              href={'#'}
              onClick={this.props.navigationActions.selectOverview}
            >
              <img
                className="icon"
                src={require('../images/th-list.png')}
                alt=""
              />{' '}
              <span
                className={classNames({
                  'd-none': true,
                  'd-md-inline': true
                })}
              >
                Overview
              </span>
            </NavLink>
          </NavItem>
          {characters_links}
        </Nav>
      </div>
    );
  }

  selectCharacter(event) {
    event.preventDefault();
    let target = $(event.target);
    let link = target.is('a') ? target : target.parent();
    this.props.navigationActions.selectCharacter(link.data('char'));
    return false;
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
