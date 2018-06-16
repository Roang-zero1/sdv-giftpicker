import * as navigationActions from '../actions/navigationActions';

import * as React from 'react';
import { Component } from 'react';
import { Navbar, NavbarToggler } from 'reactstrap';

import { connect, Dispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { RootState, StatusState } from '../common/types';
import NoSaveButton from './NoSaveButton';
import Upload from './Upload';

const BrandImg = styled.img`
  width: 30px;
  height: auto;
`;

interface IDispatchProps {
  navigationActions: typeof navigationActions;
}

interface IStateProps {
  status: StatusState;
}

interface IProps extends IDispatchProps, IStateProps {}
/* TODO: Fix buttons on right side for small layouts e.g. dropdown after md */
class Navigation extends Component<IProps> {
  public render() {
    const { save } = this.props.status;
    return (
      <Navbar sticky="top" dark={true} color="dark">
        <NavbarToggler
          onClick={this.props.navigationActions.toggleSidebar}
          className="mr-2"
        />
        <Link to="/" className="navbar-brand">
          <BrandImg src={require('../images/Logo.png')} alt="SDV-GP" />
        </Link>
        <div className="inline">
          <Upload
            inline={true}
            text={save ? 'Re-Upload' : 'Upload save'}
            className="mr-1"
          />
          {save && <NoSaveButton inline={true} />}
        </div>
      </Navbar>
    );
  }
}

function mapStateToProps(state: RootState): IStateProps {
  return {
    status: state.status
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    navigationActions: bindActionCreators(navigationActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
