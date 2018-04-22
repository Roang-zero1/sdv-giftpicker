import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
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

import tastes from '../data/GiftTastes.js';

import CheckSquare from '../images/CheckSquare';
import Square from '../images/Square';
import './DataDisplay.css';

class DataDisplay extends Component {
  render(props) {
    var characters = [];
    for (var char in this.props.characters) {
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
}

function mapStateToProps(state) {
  return {
    items: state.items,
    characters: state.characters
  };
}

export default withRouter(connect(mapStateToProps)(DataDisplay));
