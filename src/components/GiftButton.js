import * as charactersActions from '../actions/charactersActions';

import { Button, Col } from 'reactstrap';
import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import Icon from './Icon';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { connect } from 'react-redux';
import giftsMetaData from '../data/GiftsData';

const Gift = styled(({ owned, ...rest }) => <Col {...rest} />)`
  ${props =>
    !props.owned &&
    css`
      order: 1;
    `};
`;
Gift.displayName = 'Gift';

const StyledButton = styled(Button)`
  display: flex;
  text-align: left;
  width: 100%;

  div,
  img {
    pointer-events: none;
  }
`;
StyledButton.displayName = 'StyledButton';

const GiftText = styled(Col)`
  flex: 1 1 2vw;
  overflow: hidden;
`;
GiftText.displayName = 'GiftText';

const GiftCount = styled(Col)`
  text-align: right;
`;
GiftCount.displayName = 'GiftCount';

export class GiftButton extends Component {
  constructor(props) {
    super(props);
    this.giftAction = this.giftAction.bind(this);
  }

  render() {
    const { char, characters, deselect, gift, items, status } = this.props;
    const owned = gift in items && items[gift] > 0;
    return (
      <Gift className="mb-1" xs="12" md="6" xl={!deselect && '4'} owned={owned}>
        <StyledButton
          outline={!deselect}
          color={
            deselect ||
            (characters[char].selected &&
              characters[char].selected.includes(gift))
              ? 'success'
              : 'dark'
          }
          onClick={e => this.giftAction(e, char, gift, !deselect)}
          className={classNames({
            'flex-nowrap': true,
            'ml-2': true,
            'mr-2': true,
            row: true
          })}
        >
          <Col xs="1">
            <Icon gift={gift} grayscale={!owned} />
          </Col>
          <GiftText>{giftsMetaData[gift].displayName}</GiftText>
          {status.save && (
            <GiftCount xs="3">{owned ? items[gift] : 0}</GiftCount>
          )}
        </StyledButton>
      </Gift>
    );
  }

  giftAction(event, char, gift, select) {
    if (select) {
      this.props.charactersActions.selectGift(char, gift);
    } else {
      this.props.charactersActions.deselectGift(char, gift);
    }
  }
}

GiftButton.defaultProps = { deselect: false };
GiftButton.propTypes = {
  char: PropTypes.string.isRequired,
  deselect: PropTypes.bool,
  gift: PropTypes.number.isRequired
};

function mapStateToProps(state) {
  return {
    characters: state.characters,
    items: state.items,
    status: state.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    charactersActions: bindActionCreators(charactersActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GiftButton);
