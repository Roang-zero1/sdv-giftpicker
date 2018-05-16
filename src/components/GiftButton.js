import * as charactersActions from '../actions/charactersActions';
import * as itemsActions from '../actions/itemActions';

import { Button, Col } from 'reactstrap';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { connect } from 'react-redux';

import styled, { css } from 'styled-components';

import Icon from './Icon';

import giftsMetaData from '../data/GiftsData';

const Gift = styled(Col)`
  ${props =>
    !props.owned &&
    css`
      order: 1;
      .icon {
        filter: grayscale(100%);
      }
    `};
`;

const StyledButton = styled(Button)`
  display: flex;
  text-align: left;
  width: 100%;

  div,
  img {
    pointer-events: none;
  }
`;

const GiftText = styled(Col)`
  flex: 1 1 2vw;
  overflow: hidden;
`;

const GiftCount = styled(Col)`
  text-align: right;
`;

class GiftButton extends Component {
  constructor(props) {
    super(props);
    this.giftAction = this.giftAction.bind(this);
  }

  render() {
    return (
      <Gift
        className="mb-1"
        xs="12"
        md="6"
        xl={!this.props.deselect && '4'}
        owned={this.props.gift in this.props.items ? 1 : 0}
      >
        <StyledButton
          outline={!this.props.deselect}
          color={
            this.props.deselect ||
            (this.props.characters[this.props.char].selected &&
              this.props.characters[this.props.char].selected.includes(
                this.props.gift
              ))
              ? 'success'
              : 'dark'
          }
          onClick={e =>
            this.giftAction(
              e,
              this.props.char,
              this.props.gift,
              !this.props.deselect
            )
          }
          className={classNames({
            row: true,
            'flex-nowrap': true,
            'ml-2': true,
            'mr-2': true
          })}
        >
          <Col xs="1">
            <Icon gift={this.props.gift} />
          </Col>
          <GiftText>{giftsMetaData[this.props.gift].displayName}</GiftText>
          {this.props.status.save && (
            <GiftCount xs="3">
              {this.props.gift in this.props.items
                ? this.props.items[this.props.gift]
                : null}
            </GiftCount>
          )}
        </StyledButton>
      </Gift>
    );
  }

  giftAction(event, char, gift, select = true) {
    if (select) {
      this.props.charactersActions.selectGift(char, gift);
    } else {
      this.props.charactersActions.deselectGift(char, gift);
    }
  }
}

GiftButton.defaultProps = { deselect: false };

function mapStateToProps(state) {
  return {
    items: state.items,
    characters: state.characters,
    status: state.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    itemsActions: bindActionCreators(itemsActions, dispatch),
    charactersActions: bindActionCreators(charactersActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftButton);
