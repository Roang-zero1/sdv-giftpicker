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
  }

  render(props) {
    let char = this.props.match.params.characterName;
    if (char in tastes) {
      return (
        <Col xs="12">
          <Row>
            <Col xs="12">
              <h2>
                {char}{' '}
                <img
                  src={require('../images/characters/' + char + '.png')}
                  alt=""
                />
              </h2>
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
    for (var gift in characterTastes) {
      const itemID = characterTastes[gift];
      gifts.push(
        <Col
          xs="12"
          md="6"
          xl="4"
          className={classNames({
            item: true,
            missing: !(itemID in this.props.items),
            'mb-1': true
          })}
          key={itemID}
        >
          <Button
            outline
            color={
              this.props.characters[char].selected &&
              this.props.characters[char].selected.includes(itemID)
                ? 'success'
                : 'dark'
            }
            onClick={this.selectGift}
            {...{ 'data-char': char, 'data-item': itemID }}
            className={classNames({
              row: true,
              gift: true,
              'ml-2': true,
              'mr-2': true
            })}
          >
            <Col xs="1">
              <img
                className="icon"
                src={require('../images/items/' +
                  this.props.giftsMetaData[itemID].name +
                  '.png')}
                alt=""
              />
            </Col>
            <Col xs="auto">{this.props.giftsMetaData[itemID].displayName}</Col>
            {this.props.status.save && (
              <Col xs="3" align-self="end" className="count">
                {itemID in this.props.items ? this.props.items[itemID] : null}
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

  /* TODO: Error handling */
  selectGift(event) {
    let target = $(event.target);
    let char = target.data('char');
    let itemID = target.data('item');
    this.props.charactersActions.selectGift(char, itemID);
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
