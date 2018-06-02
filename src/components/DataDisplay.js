import './DataDisplay.css';

import * as charactersActions from '../actions/charactersActions';

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Container,
  Row
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom';
import React, { Component } from 'react';

import $ from 'jquery';
import CheckSquare from '../images/CheckSquare';
import Square from '../images/Square';
import { bindActionCreators } from 'redux';
import classNames from 'classnames';
import { connect } from 'react-redux';
import tastes from '../data/GiftTastes.json';

class DataDisplay extends Component {
  constructor(props) {
    super(props);
    this.deselectGift = this.deselectGift.bind(this);
  }

  render(props) {
    let characters = [];
    for (var char of Object.keys(this.props.characters).sort()) {
      let charData = this.props.characters[char];
      let order = 0;
      if (charData.selected && charData.selected.length > 0) {
        order = 2 - (charData.selected ? charData.selected.length : 0);
      } else {
        order = 10 + charData.gifts;
      }

      let gifts = [];
      let giftCount = 0;
      if (char in tastes) {
        for (let gift of charData.selected || []) {
          gifts.push(
            <Button
              outline
              key={giftCount}
              color="success"
              onClick={this.deselectGift}
              {...{ 'data-char': char, 'data-item': gift }}
              className={classNames({
                gift: true,
                'mb-3': true,
                'ml-1': true,
                'mr-1': true
              })}
            >
              <img
                className="icon"
                src={require('../images/items/' +
                  this.props.giftsMetaData[gift].name +
                  '.png')}
                alt=""
              />
            </Button>
          );
          giftCount++;
        }
        characters.push(
          <Col
            xs="6"
            md="4"
            lg="3"
            xl="2"
            key={char}
            className="mb-4"
            style={{ order: order }}
          >
            <Card
              className={classNames({
                'bg-light': true,
                character: true,
                shadow: true,
                'text-center': true
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
                  {charData.gifts > 0 ? (
                    <CheckSquare
                      className={classNames({ icon: true, checked: true })}
                      aria-label="Gift 1 given"
                    />
                  ) : (
                    <Square
                      className={classNames({ icon: true, unchecked: true })}
                      aria-label="Gift 1 missing"
                    />
                  )}
                  {charData.gifts > 1 ? (
                    <CheckSquare
                      className={classNames({ icon: true, checked: true })}
                      aria-label="Gift 1 given"
                    />
                  ) : (
                    <Square
                      className={classNames({ icon: true, unchecked: true })}
                      aria-label="Gift 2 missing"
                    />
                  )}
                </CardText>
                {gifts}
                <Link
                  className={classNames({ btn: true, 'btn-primary': true })}
                  to={`character/${char}`}
                >
                  Select Gifts
                </Link>
              </CardBody>
            </Card>
          </Col>
        );
      }
    }
    return (
      <Container id="data-display" fluid>
        <Row>
          <Col xs="12">
            <h2>Characters</h2>
          </Col>
          {characters}
        </Row>
      </Container>
    );
  }

  deselectGift(event) {
    let target = $(event.target);
    let char = target.data('char');
    let itemID = target.data('item');
    this.props.charactersActions.setGiftCount({
      char,
      count: this.props.characters[char].gifts + 1
    });
    this.props.charactersActions.deselectGift({ char, itemID });
  }
}

function mapStateToProps(state) {
  return {
    characters: state.characters
  };
}

function mapDispatchToProps(dispatch) {
  return {
    charactersActions: bindActionCreators(charactersActions, dispatch)
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(DataDisplay)
);
