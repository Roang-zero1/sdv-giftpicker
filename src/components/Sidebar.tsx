import * as navigationActions from '../actions/navigationActions';

import * as React from 'react';
import { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';

import * as classNames from 'classnames';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import { List } from 'styled-icons/fa-solid/List';
import {
  CharacterState,
  IGiftTastes,
  NavigationState,
  RootState
} from '../common/types';

import characterIcons from '../data/CharacterIcons';

/* tslint:disable-next-line:no-var-requires */
const GiftTastes: IGiftTastes = require('../data/GiftTastes.json');

const SidebarElement = styled.div`
  overflow-y: auto;
  height: auto;
`;

const SidebarLink = styled(NavLink)`
  color: rgba(255, 255, 255, 0.5);
  &:active,
  &:hover {
    color: rgba(255, 255, 255, 0.75);
  }

  &.nav-active {
    color: #fff;
  }
`;

const SideNav = styled(Nav)`
  flex-wrap: nowrap;
`;

const StyledList = List.extend`
  max-width: 24px;
  height: auto;
`;

const Img = styled.img`
  max-width: 24px;
  height: auto;
`;

export interface IDispatchProps {
  navigationActions: typeof navigationActions;
}

export interface IStateProps {
  characters: CharacterState;
  navigation: NavigationState;
}

export interface IProps
  extends IDispatchProps,
    IStateProps,
    RouteComponentProps<any> {}

class Sidebar extends Component<IProps> {
  public render() {
    const charactersLinks = [];
    for (const char in this.props.characters) {
      if (char in GiftTastes && this.props.characters[char].gifts < 2) {
        charactersLinks.push(
          <NavItem key={char}>
            <SidebarLink
              className="nav-link"
              exact={true}
              activeClassName="nav-active"
              to={`/character/${char}`}
            >
              <Img className="icon" src={characterIcons[char]} alt="" />{' '}
              <span
                className={classNames({
                  'd-md-inline': true,
                  'd-none': true
                })}
              >
                {char}
              </span>
            </SidebarLink>
          </NavItem>
        );
      }
    }
    return (
      <SidebarElement id="sidebar" className="bg-dark">
        <SideNav
          vertical={true}
          className={classNames({
            'flex-column': true,
            in: true
          })}
        >
          <NavItem key="overview">
            <SidebarLink
              className="nav-link"
              exact={true}
              activeClassName="nav-active"
              to="/"
            >
              <StyledList />{' '}
              <span
                className={classNames({
                  'd-md-inline': true,
                  'd-none': true
                })}
              >
                Overview
              </span>
            </SidebarLink>
          </NavItem>
          {charactersLinks}
        </SideNav>
      </SidebarElement>
    );
  }
}

function mapStateToProps(state: RootState): IStateProps {
  return {
    characters: state.characters,
    navigation: state.navigation
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    navigationActions: bindActionCreators(navigationActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Sidebar)
);
