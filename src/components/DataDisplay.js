import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText
} from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import classNames from 'classnames';
import $ from 'jquery';

import tastes from '../data/GiftTastes.js';

import * as charactersActions from '../actions/charactersActions';

import CheckSquare from '../images/CheckSquare';
import Square from '../images/Square';
import './DataDisplay.css';

class DataDisplay extends Component {
  constructor(props) {
    super(props);
    this.deselectGift = this.deselectGift.bind(this);
  }

  render(props) {
    var characters = [];
    for (var char in this.props.characters) {
      let gifts = [];
      let giftCount = 0;
      for (let gift of this.props.characters[char].selected || []) {
        gifts.push(
          <Button
            outline
            key={giftCount}
            color="success"
            onClick={this.deselectGift}
            {...{ 'data-char': char, 'data-item': gift }}
            className={classNames({
              gift: true,
              'ml-1': true,
              'mr-1': true,
              'mb-3': true
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
      if (char in tastes) {
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
                  {this.props.characters[char].gifts > 0 ? (
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
                  {this.props.characters[char].gifts > 1 ? (
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
    this.props.charactersActions.setGiftCount(
      char,
      this.props.characters[char].gifts + 1
    );
    this.props.charactersActions.deselectGift(char, itemID);
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
  connect(mapStateToProps, mapDispatchToProps)(DataDisplay)
);
