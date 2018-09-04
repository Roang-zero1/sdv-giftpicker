import './DataDisplay.css';

import * as charactersActions from '../actions/charactersActions';

import * as React from 'react';
import { Component } from 'react';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
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

import * as classNames from 'classnames';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { CheckSquare } from 'styled-icons/fa-regular/CheckSquare';
import { Square } from 'styled-icons/fa-regular/Square';
import { CharacterState, IGiftTastes, RootState } from '../common/types';
import characterPortraits from '../data/CharacterPortraits';
import GiftIcon from './Icon';

/* tslint:disable-next-line:no-var-requires */
const GiftTastes: IGiftTastes = require('../data/GiftTastes.json');

export interface IStateProps {
  characters: CharacterState;
}

export interface IDispatchProps {
  charactersActions: typeof charactersActions;
}

export interface IProps
  extends IStateProps,
    IDispatchProps,
    RouteComponentProps<any> {}

const GreenCheckSquare = CheckSquare.extend`
  color: green;
  height: auto;
  margin-left: 0.4em;
  max-width: 24px;
`;

const RedSquare = Square.extend`
  color: darkred;
  height: auto;
  margin-left: 0.4em;
  max-width: 24px;
`;

class DataDisplay extends Component<IProps> {
  public render() {
    const { characters } = this.props;
    const renderedCharacters = [];
    for (const char of Object.keys(characters).sort()) {
      const charData = characters[char];
      let order = 0;
      if (charData.selected && charData.selected.length > 0) {
        order = 2 - (charData.selected ? charData.selected.length : 0);
      } else {
        order = 10 + charData.gifts;
      }

      const gifts = [];
      let giftCount = 0;
      if (char in GiftTastes) {
        for (const gift of charData.selected || []) {
          gifts.push(
            <Button
              outline={true}
              key={giftCount}
              color="success"
              onClick={this.deselectGift.bind(this, char, gift)}
              {...{ 'data-char': char, 'data-item': gift }}
              className={classNames({
                gift: true,
                'mb-3': true,
                'ml-1': true,
                'mr-1': true
              })}
            >
              <GiftIcon gift={gift} />
            </Button>
          );
          giftCount++;
        }
        renderedCharacters.push(
          <Col
            xs="6"
            md="4"
            lg="3"
            xl="2"
            key={char}
            className="mb-4"
            style={{ order }}
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
              <CardImg width="100%" src={characterPortraits[char]} alt="" />
              <CardBody>
                <CardTitle>{char}</CardTitle>
                <CardText>
                  {charData.gifts > 0 ? (
                    <GreenCheckSquare
                      className={classNames({ icon: true })}
                      aria-label="Gift 1 given"
                    />
                  ) : (
                    <RedSquare
                      className={classNames({ icon: true })}
                      aria-label="Gift 1 missing"
                    />
                  )}
                  {charData.gifts > 1 ? (
                    <GreenCheckSquare
                      className={classNames({ icon: true })}
                      aria-label="Gift 2 given"
                    />
                  ) : (
                    <RedSquare
                      className={classNames({ icon: true })}
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
      <Container id="data-display" fluid={true}>
        <Row>
          <Col xs="12">
            <h2>Characters</h2>
          </Col>
          {renderedCharacters}
        </Row>
      </Container>
    );
  }

  public deselectGift(char: string, itemID: number) {
    this.props.charactersActions.setGiftCount({
      char,
      count: this.props.characters[char].gifts + 1
    });
    this.props.charactersActions.deselectGift({
      char,
      itemID
    });
  }
}

function mapStateToProps(state: RootState) {
  return {
    characters: state.characters
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
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
