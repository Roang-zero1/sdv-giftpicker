import * as charactersActions from '../actions/charactersActions';

import * as React from 'react';
import { Component } from 'react';
import { Button, Col, ColProps } from 'reactstrap';
import styled from 'styled-components';

import * as classNames from 'classnames';
import { connect, Dispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  CharacterState,
  IGiftData,
  ItemsState,
  RootState,
  StatusState
} from '../common/types';
import Icon from './Icon';

/* tslint:disable-next-line:no-var-requires */
const giftsData: IGiftData = require('../data/GiftsData.json');

export interface IDispatchProps {
  charactersActions: typeof charactersActions;
}

export interface IStateProps {
  characters: CharacterState;
  items: ItemsState;
  status: StatusState;
}

export interface IProps extends IDispatchProps, IStateProps {
  char: string;
  gift: number;
  deselect?: boolean;
}

interface IGiftProp extends ColProps {
  owned: boolean;
}

const Gift = styled(Col)<IGiftProp>`
  order: ${props => (props.owned ? undefined : 1)};
`;

Gift.displayName = 'Gift';

const StyledButton = styled(Button)`
  display: flex;
  text-align: left;
  width: 100%;

  div,
  img {
    pointer-events: none;
  }
`;
StyledButton.displayName = 'StyledButton';

const GiftText = styled(Col)`
  flex: 1 1 2vw;
  overflow: hidden;
`;
GiftText.displayName = 'GiftText';

const GiftCount = styled(Col)`
  text-align: right;
`;
GiftCount.displayName = 'GiftCount';

export class GiftButton extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.giftAction = this.giftAction.bind(this);
  }

  public render() {
    const { char, characters, deselect, gift, items, status } = this.props;
    const owned = gift in items && items[gift] > 0;
    return (
      <Gift className="mb-1" xs="12" md="6" xl={!deselect && '4'} owned={owned}>
        <StyledButton
          outline={!deselect}
          color={
            deselect ||
            (characters[char].selected &&
              characters[char].selected.indexOf(gift) > -1)
              ? 'success'
              : 'dark'
          }
          onClick={this.giftAction.bind(this, char, gift, !deselect)}
          className={classNames({
            'flex-nowrap': true,
            'ml-2': true,
            'mr-2': true,
            row: true
          })}
        >
          <Col xs="1" className="p-0">
            <Icon gift={gift} grayscale={!owned} />
          </Col>
          <GiftText>{giftsData[gift].displayName}</GiftText>
          {status.save && (
            <GiftCount xs="3">{owned ? items[gift] : 0}</GiftCount>
          )}
        </StyledButton>
      </Gift>
    );
  }

  private giftAction(char: string, itemID: number, select: boolean) {
    if (select) {
      this.props.charactersActions.selectGift({ char, itemID });
    } else {
      this.props.charactersActions.deselectGift({ char, itemID });
    }
  }
}

function mapStateToProps(state: RootState): IStateProps {
  return {
    characters: state.characters,
    items: state.items,
    status: state.status
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    charactersActions: bindActionCreators(charactersActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftButton);
