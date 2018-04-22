import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
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
  }

  render(props) {
    var characters = [];
    for (var char in tastes) {
      if (
        char in this.props.characters &&
        this.props.characters[char].gifts < 2
      ) {
        var categories_output = [];
        for (var cat in categories_map) {
          categories_output.push(this.renderGiftCategories(char, cat));
        }

        characters.push(
          <Col xs="6" md="4" lg="3" xl="2" key={char} className="mb-4">
            <Card
              className={classNames({
                'bg-light': true,
                'text-center': true,
                character: true,
                shadow: true
              })}
              id={char}
            >
              <CardImg
                width="100%"
                src={require('../images/characters/' + char + '.png')}
                alt=""
              />
              <CardBody>
                <CardTitle>{char}</CardTitle>
                <CardText>
                  Gifts given{' '}
                  {this.props.characters[char].gifts > 0 ? 'X' : 'O'}
                  {this.props.characters[char].gifts > 1 ? 'X' : 'O'}
                </CardText>
                <Button data-char={char} onClick={this.selectCharacter}>
                  Select Gifts
                </Button>
              </CardBody>
            </Card>
          </Col>
        );
      }
    }
    return (
      <Container fluid>
        <Row>
          <Col xs="12">
            <h2>Characters</h2>
          </Col>
          {characters}
        </Row>
      </Container>
    );
  }

  renderGiftCategories(char, category) {
    if (char in tastes && category in tastes[char]) {
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
              <Col xs="auto">
                {this.props.giftsMetaData[itemID].displayName}
              </Col>
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
    characters: state.characters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    navigationActions: bindActionCreators(navigationActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DataDisplay);
