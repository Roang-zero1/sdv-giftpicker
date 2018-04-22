import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Button } from 'reactstrap';
import classNames from 'classnames';
import $ from 'jquery';

import * as navigationActions from '../actions/navigationActions';

import tastes from '../data/GiftTastes.js';

import './DataDisplay.css';

const categories_map = {
  0: 'Love',
  1: 'Like',
  4: 'neutral'
};

class DataDisplay extends Component {
  constructor(props) {
    super(props);
    this.selectCharacter = this.selectCharacter.bind(this);
    this.renderGiftCategories = this.renderGiftCategories.bind(this);
  }

  render(props) {
    return (
      <Col xs="12">
        <Row>
          <Col xs="12">
            <h2>
              {this.props.navigation.selection}{' '}
              <img
                src={require('../images/characters/' +
                  this.props.navigation.selection +
                  '.png')}
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
  }

  renderGiftCategories(category) {
    var char = this.props.navigation.selection;
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
            className={classNames({ row: true, 'ml-2': true, 'mr-2': true })}
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
            <Col xs="3" align-self="end" className="count">
              {itemID in this.props.items ? this.props.items[itemID] : null}
            </Col>
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

  selectCharacter(event) {
    event.preventDefault();
    let target = $(event.target);
    this.props.navigationActions.selectCharacter(target.data('char'));
    return false;
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    characters: state.characters,
    navigation: state.navigation
  };
}

export default connect(mapStateToProps)(DataDisplay);
