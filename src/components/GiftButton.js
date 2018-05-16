import './GiftPicker.css';

import * as charactersActions from '../actions/charactersActions';
import * as itemsActions from '../actions/itemActions';

import { Button, Col } from 'reactstrap';
import React, { Component } from 'react';

import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { connect } from 'react-redux';


import giftsMetaData from '../data/GiftsData';
class GiftButton extends Component {
  constructor(props) {
    super(props);
    this.giftAction = this.giftAction.bind(this);
  }

  render() {
    let props;
    if (this.props.deselect) {
      props = {
        xs: '12',
        md: '6',
        className: 'mb-1'
      };
    } else {
      props = {
        xs: '12',
        md: '6',
        xl: '4',
        className: classNames({
          'mb-1': true,
          missing: !(this.props.gift in this.props.items)
        })
      };
    }
    return (
      <Col {...props}>
        <Button
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
            gift: true,
            row: true,
            'flex-nowrap': true,
            'ml-2': true,
            'mr-2': true
          })}
        >
          <Col xs="1">
            <Icon gift={this.props.gift} />
          </Col>
          <Col className="gift-text">
            {giftsMetaData[this.props.gift].displayName}
          </Col>
          {this.props.status.save && (
            <Col xs="3" align-self="end" className="count">
              {this.props.gift in this.props.items
                ? this.props.items[this.props.gift]
                : null}
            </Col>
          )}
        </Button>
      </Col>
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
