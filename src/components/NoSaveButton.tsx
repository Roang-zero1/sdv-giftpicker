import * as charactersActions from '../actions/charactersActions';
import * as itemsActions from '../actions/itemsActions';
import * as statusActions from '../actions/statusActions';

import * as React from 'react';
import { Component } from 'react';

import { connect, Dispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { IGiftTastes } from '../common/types';

/* tslint:disable-next-line:no-var-requires */
const giftIDs: number[] = require('../data/Gifts.json');
/* tslint:disable-next-line:no-var-requires */
const giftTastes: IGiftTastes = require('../data/GiftTastes.json');

export interface IDispatchProps {
  charactersActions: typeof charactersActions;
  itemsActions: typeof itemsActions;
  statusActions: typeof statusActions;
}

export interface IProps extends IDispatchProps {
  inline?: boolean;
  text?: string;
  className?: string;
}

export class NoSaveButton extends Component<IProps> {
  constructor(props: IProps) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  public render() {
    const { className, text, inline } = this.props;
    return (
      <Button
        color="secondary"
        onClick={this.handleClick}
        className={className}
        size={inline ? 'sm' : undefined}
      >
        {text ? text : 'Use without save'}
      </Button>
    );
  }

  public handleClick() {
    this.props.statusActions.setLoading(true);
    this.props.statusActions.setSaveGame(false);
    for (const char of Object.keys(giftTastes)) {
      this.props.charactersActions.setGiftCount({ char, count: 0 });
    }
    const items = {};
    for (const gift of giftIDs) {
      items[gift] = 999;
    }
    this.props.itemsActions.updateItems(items);

    this.props.statusActions.setLoading(false);
    this.props.statusActions.setIntroChosen(true);
  }
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchProps {
  return {
    charactersActions: bindActionCreators(charactersActions, dispatch),
    itemsActions: bindActionCreators(itemsActions, dispatch),
    statusActions: bindActionCreators(statusActions, dispatch)
  };
}

export default connect(
  null,
  mapDispatchToProps
)(NoSaveButton);
