import './GiftButton.css';

import { Col, Row } from 'reactstrap';
import React, { Component } from 'react';

import GiftButton from './GiftButton';
import { connect } from 'react-redux';
import tastes from '../data/GiftTastes.js';

const categories_map = {
  0: 'Love',
  1: 'Like',
  4: 'neutral'
};

class GiftPicker extends Component {
  constructor(props) {
    super(props);
    this.renderGiftCategories = this.renderGiftCategories.bind(this);
  }

  render() {
    let char = this.props.match.match.params.characterName;
    let gifts = [];
    let key = 0;
    for (let gift of this.props.characters[char].selected || []) {
      gifts.push(<GiftButton gift={gift} char={char} key={key++} deselect />);
    }

    return (
      <Col id="gift-picker" xs="12">
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
  }

  renderGiftCategories(category) {
    let char = this.props.match.match.params.characterName;
    let characterTastes = tastes[char][category];
    let gifts = [];
    let key = 0;
    for (var gift of characterTastes) {
      gifts.push(<GiftButton gift={gift} char={char} key={key++} />);
    }
    return (
      <Col xs="12" key={category}>
        <h4>{categories_map[category]}</h4>
        <Row>{gifts}</Row>
      </Col>
    );
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

export default connect(mapStateToProps)(GiftPicker);
