import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';
import classNames from 'classnames';
import './DataDisplay.css';
import tastes from './GiftTastes.js'

class DataDisplay extends Component {
  render(props) {
    var characters = [];
    for (var char in this.props.charactersData) {
      if (this.props.charactersData[char] < 2) {
        {
          /* TODO: loop through categories automatically*/
        }
        var love = this.renderGiftCategories(char, 0);
        var like = this.renderGiftCategories(char, 1);
        var neutral = this.renderGiftCategories(char, 2);

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
              Gifts given {this.props.charactersData[char] > 0 ? 'X' : 'O'}
              {this.props.charactersData[char] > 1 ? 'X' : 'O'}
            </p>
            <Container>
              <h4>Love</h4>
              <Row>{love}</Row>
            </Container>
            <Container>
              <h4>Like</h4>
              <Row>{like}</Row>
            </Container>
            <Container>
              <h4>Neutral</h4>
              <Row>{neutral}</Row>
            </Container>
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
            missing: !this.props.giftsData[itemID].count
          })}
          key={itemID}
        >
          <Row>
          <Col xs="1"><img
            className="icon"
            src={require('./images/items/' + this.props.giftsData[itemID].name + '.png')}
            alt=""
          /></Col>
          <Col xs="auto">{this.props.giftsData[itemID].displayName}</Col>
          <Col xs="3" align-self="end" className="count">{this.props.giftsData[itemID].count}</Col>
          </Row>
        </Col>
      );
    }
    return gifts;
  }
}

export default DataDisplay;
