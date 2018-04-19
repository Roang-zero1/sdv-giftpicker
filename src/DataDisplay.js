import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
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
      if (this.props.characters[char].gifts < 2) {
        var categories_output = [];
        for (var cat in categories_map) {
          categories_output.push(this.renderGiftCategories(char, cat));
        }

        characters.push(
          <div key={char}>
            <h3>
              {char}{' '}
              <img
                className="icon"
                src={require('./images/characters/' + char + '.png')}
                alt=""
              />{' '}
            </h3>
            <p>
              Gifts given {this.props.characters[char].gifts > 0 ? 'X' : 'O'}
              {this.props.characters[char].gifts > 1 ? 'X' : 'O'}
            </p>
            {categories_output}
          </div>
        );
      }
    }
    return (
      <Container>
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
            sm="6"
            lg="4"
            xl="3"
            className={classNames({
              item: true,
              missing: !(itemID in this.props.items)
            })}
            key={itemID}
          >
            <Row>
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
            </Row>
          </Col>
        );
      }
      return (
        <Container key={category}>
          <h4>{categories_map[category]}</h4>
          <Row>{gifts}</Row>
        </Container>
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
