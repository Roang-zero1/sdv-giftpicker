import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import classNames from 'classnames';
import $ from 'jquery';

import { withRouter, Redirect } from 'react-router-dom';

import tastes from '../data/GiftTastes.js';

import * as itemsActions from '../actions/itemActions';
import * as charactersActions from '../actions/charactersActions';

import './GiftPicker.css';

const categories_map = {
  0: 'Love',
  1: 'Like',
  4: 'neutral'
};

class DataDisplay extends Component {
  constructor(props) {
    super(props);
    this.renderGiftCategories = this.renderGiftCategories.bind(this);
    this.selectGift = this.selectGift.bind(this);
    this.deselectGift = this.deselectGift.bind(this);
  }

  render(props) {
    let char = this.props.match.params.characterName;
    if (char in tastes) {
      let gifts = [];
      for (let gift of this.props.characters[char].selected || []) {
        gifts.push(
          <Col xs="12" md="6" className="mb-1" key={gift}>
            <Button
              color="success"
              onClick={this.deselectGift}
              {...{ 'data-char': char, 'data-item': gift }}
              className={classNames({
                gift: true,
                row: true,
                'flex-nowrap': true,
                'ml-2': true,
                'mr-2': true
              })}
            >
              <Col xs="1">
                <img
                  className="icon"
                  src={require('../images/items/' +
                    this.props.giftsMetaData[gift].name +
                    '.png')}
                  alt=""
                />
              </Col>
              <Col className="gift-text">
                {this.props.giftsMetaData[gift].displayName}
              </Col>
              {this.props.status.save && (
                <Col xs="3" align-self="end" className="count">
                  {gift in this.props.items ? this.props.items[gift] : null}
                </Col>
              )}
            </Button>
          </Col>
        );
      }

      return (
        <Col xs="12">
          <Row>
            <Col xs="12" lg="4">
              <h2>
                {char}{' '}
                <img
                  src={require('../images/characters/' + char + '.png')}
                  alt=""
                />
              </h2>
            </Col>
            <Col xs="12" lg="8">
              <Row>{gifts}</Row>
            </Col>
            {this.renderGiftCategories(0)}
            {this.renderGiftCategories(1)}
            {this.renderGiftCategories(4)}
          </Row>
        </Col>
      );
    } else {
      return <Redirect to="/" />;
    }
  }

  renderGiftCategories(category) {
    let char = this.props.match.params.characterName;
    var characterTastes = tastes[char][category];
    var gifts = [];
    for (var gift of characterTastes) {
      gifts.push(
        <Col
          xs="12"
          md="6"
          xl="4"
          className={classNames({
            'mb-1': true,
            missing: !(gift in this.props.items)
          })}
          key={gift}
        >
          <Button
            outline
            color={
              this.props.characters[char].selected &&
              this.props.characters[char].selected.includes(gift)
                ? 'success'
                : 'dark'
            }
            onClick={this.selectGift}
            {...{ 'data-char': char, 'data-item': gift }}
            className={classNames({
              gift: true,
              row: true,
              'flex-nowrap': true,
              'ml-2': true,
              'mr-2': true
            })}
          >
            <Col xs="1">
              <img
                className="icon"
                src={require('../images/items/' +
                  this.props.giftsMetaData[gift].name +
                  '.png')}
                alt=""
              />
            </Col>
            <Col className="gift-text">
              {this.props.giftsMetaData[gift].displayName}
            </Col>
            {this.props.status.save && (
              <Col xs="3" align-self="end" className="count">
                {gift in this.props.items ? this.props.items[gift] : null}
              </Col>
            )}
          </Button>
        </Col>
      );
    }
    return (
      <Col xs="12" key={category}>
        <h4>{categories_map[category]}</h4>
        <Row>{gifts}</Row>
      </Col>
    );
  }

  selectGift(event) {
    let target = $(event.target);
    let char = target.data('char');
    let itemID = target.data('item');
    this.props.charactersActions.selectGift(char, itemID);
  }

  deselectGift(event) {
    let target = $(event.target);
    let char = target.data('char');
    let itemID = target.data('item');
    this.props.charactersActions.deselectGift(char, itemID);
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    characters: state.characters,
    navigation: state.navigation,
    status: state.status
  };
}

function mapDispatchToProps(dispatch) {
  return {
    itemsActions: bindActionCreators(itemsActions, dispatch),
    charactersActions: bindActionCreators(charactersActions, dispatch)
  };
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DataDisplay)
);
