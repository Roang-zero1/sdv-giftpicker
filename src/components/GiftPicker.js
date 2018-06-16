import { Col, Row } from 'reactstrap';
import React, { Component } from 'react';

import GiftButton from './GiftButton';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { connect } from 'react-redux';
import styled from 'styled-components';
import tastes from '../data/GiftTastes.json';

import characterIcons from '../data/CharacterIcons';

const categoriesMap = {
  0: 'Love',
  1: 'Like',
  4: 'neutral'
};

const CharacterImage = styled.img`
  padding: 0 0.5em;
`;
CharacterImage.displayName = 'CharacterImage';

const HeaderRow = styled(Row)`
  align-items: center;
  h2 {
    margin: 0;
  }
`;
HeaderRow.displayName = 'HeaderRow';

export class GiftPicker extends Component {
  constructor(props) {
    super(props);
    this.renderGiftCategories = this.renderGiftCategories.bind(this);
  }

  render() {
    const { char } = this.props;
    const character = this.props.character || { selected: [] };
    let gifts = [];
    let key = 0;

    for (let gift of character.selected) {
      gifts.push(<GiftButton gift={gift} char={char} key={key++} deselect />);
    }

    return (
      <Col id="gift-picker" xs="12">
        <HeaderRow
          className={classNames({
            'border-bottom': true,
            'mb-2': true
          })}
        >
          <Col xs="12" lg="4">
            <h2>
              {char}
              <CharacterImage src={characterIcons[char]} alt="" />
            </h2>
          </Col>
          <Col xs="12" lg="8">
            <Row>{gifts}</Row>
          </Col>
        </HeaderRow>
        <Row>
          {this.renderGiftCategories(0)}
          {this.renderGiftCategories(1)}
          {this.renderGiftCategories(4)}
        </Row>
      </Col>
    );
  }

  renderGiftCategories(category) {
    const { char } = this.props;
    let characterTastes = tastes[char][category];
    let gifts = [];
    let key = 0;
    for (var gift of characterTastes) {
      gifts.push(<GiftButton gift={gift} char={char} key={key++} />);
    }
    return (
      <Col xs="12" key={category}>
        <h4>{categoriesMap[category]}</h4>
        <Row>{gifts}</Row>
      </Col>
    );
  }
}

GiftPicker.propTypes = {
  char: PropTypes.string.isRequired
};

function mapStateToProps(state, props) {
  const { char } = props;
  return {
    character: state.characters[char]
  };
}

export default connect(mapStateToProps)(GiftPicker);
