import * as React from 'react';
import { Component } from 'react';
import { Col, Row } from 'reactstrap';

import * as classNames from 'classnames';
import { connect } from 'react-redux';
import styled from 'styled-components';
import GiftButton from './GiftButton';

import { IGiftTastes, RootState } from '../common/types';
import characterIcons from '../data/CharacterIcons';
import { ICharacter } from '../reducers/charactersReducer';

/* tslint:disable-next-line:no-var-requires */
const giftTastes: IGiftTastes = require('../data/GiftTastes.json');

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

export interface IStateProps {
  character: ICharacter;
}

export interface IProps {
  char: string;
}

export class GiftPicker extends Component<IProps & IStateProps> {
  constructor(props: IProps & IStateProps) {
    super(props);
    this.renderGiftCategories = this.renderGiftCategories.bind(this);
  }

  public render() {
    const { char } = this.props;
    const character = this.props.character || { selected: [] };
    const gifts = [];
    let key = 0;

    for (const gift of character.selected) {
      gifts.push(
        <GiftButton gift={gift} char={char} key={key++} deselect={true} />
      );
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

  public renderGiftCategories(category: number) {
    const { char } = this.props;
    const characterTastes = giftTastes[char][category];
    const gifts = [];
    let key = 0;
    for (const gift of characterTastes) {
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

function mapStateToProps(state: RootState, props: IProps): IStateProps {
  const { char } = props;
  return {
    character: state.characters[char]
  };
}

export default connect(mapStateToProps)(GiftPicker);
