import React, { Component } from 'react';
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
import './DataDisplay.css';
import tastes from './data/GiftTastes.js';

const categories_map = {
  0: 'Love',
  1: 'Like',
  4: 'neutral'
};

class DataDisplay extends Component {
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
          <div key={char}>
            <Col xs="3">
              <Card
                className={classNames({
                  'bg-light': true,
                  'text-center': true,
                  character: true,
                  shadow: true
                })}
              >
                <CardImg
                  width="100%"
                  src={require('./images/characters/' + char + '.png')}
                  alt=""
                />
                <CardBody>
                  <CardTitle>{char}</CardTitle>
                  <CardText>
                    Gifts given{' '}
                    {this.props.characters[char].gifts > 0 ? 'X' : 'O'}
                    {this.props.characters[char].gifts > 1 ? 'X' : 'O'}
                  </CardText>
                </CardBody>
              </Card>
            </Col>
            {categories_output}
          </div>
        );
      }
    }
    return (
      <Container fluid className="m-4">
        <h2>Characters</h2>
        {characters}
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
              'no-gutters': true,
              'mb-1': true
            })}
            key={itemID}
          >
            <Button outline className={'row'}>
              <Col xs="1">
                <img
                  className="icon"
                  src={require('./images/items/' +
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
        <div key={category}>
          <h4>{categories_map[category]}</h4>
          <Row>{gifts}</Row>
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    items: state.items,
    characters: state.characters
  };
}

export default connect(mapStateToProps)(DataDisplay);
