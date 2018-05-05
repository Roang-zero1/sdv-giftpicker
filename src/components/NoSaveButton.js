import './Upload.css';

import * as charactersActions from '../actions/charactersActions';
import * as itemsActions from '../actions/itemActions';
import * as statusActions from '../actions/statusActions';

import React, { Component } from 'react';

import { Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import giftIDs from '../data/Gifts';
import giftTastes from '../data/GiftTastes';

class NoSaveButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  render(props) {
    return (
      <Button
        color="secondary"
        onClick={this.handleClick}
        className={this.props.className}
        size={this.props.inline ? 'sm' : null}
      >
        {this.props.text ? this.props.text : 'Use without save'}
      </Button>
    );
  }

  handleClick(event) {
    this.props.statusActions.setLoading(true);
    this.props.statusActions.setSaveGame(false);
    for (let char in giftTastes) {
      this.props.charactersActions.setGiftCount(char, 0);
    }
    let items = {};
    for (let gift of giftIDs) {
      items[gift] = 999;
    }
    this.props.itemsActions.updateItems(items);

    this.props.statusActions.setLoading(false);
    this.props.statusActions.setIntroChosen(true);
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    itemsActions: bindActionCreators(itemsActions, dispatch),
    statusActions: bindActionCreators(statusActions, dispatch),
    charactersActions: bindActionCreators(charactersActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoSaveButton);
