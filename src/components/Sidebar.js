import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { Nav, NavItem, NavLink } from 'reactstrap';

import tastes from '../data/GiftTastes.js';

import './Sidebar.css';

class Sidebar extends Component {
  render() {
    let characters_links = [];
    for (var char in tastes) {
      if (
        char in this.props.characters &&
        this.props.characters[char].gifts < 2
      ) {
        characters_links.push(
          <NavItem>
            <NavLink href={'#' + char}>
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
      <div id="sidebar">
        <Nav
          vertical
          className={classNames({
            in: true,
            'flex-column': true
          })}
        >
          {characters_links}
        </Nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.status,
    characters: state.characters
  };
}

export default connect(mapStateToProps)(Sidebar);
