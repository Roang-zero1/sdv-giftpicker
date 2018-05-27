import * as charactersActions from '../actions/charactersActions';
import * as itemsActions from '../actions/itemsActions';
import * as statusActions from '../actions/statusActions';

import * as React from 'react';
import { Component, RefObject } from 'react';

import * as $ from 'jquery';
import { connect, Dispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { RootState } from '../common/types';
import giftIDs from '../data/Gifts';

export interface IDispatchProps {
  charactersActions: typeof charactersActions;
  itemsActions: typeof itemsActions;
  statusActions: typeof statusActions;
}

export interface IProps extends IDispatchProps {
  inline: boolean;
  other: any;
  text: string;
  className: string;
}

interface IWrapperProps {
  inline: boolean;
}

const Wrapper = styled<IWrapperProps, 'div'>('div')`
  display: ${props => (props.inline ? 'inline-block' : undefined)};
`;

const HiddenInput = styled.input`
  display: none;
`;

class Upload extends Component<IProps> {
  private inputRef: RefObject<HTMLInputElement>;
  // TODO: Properly type this
  private items: any;
  constructor(props: any) {
    super(props);
    this.inputRef = React.createRef();
  }

  public render() {
    const { inline, className, text } = this.props;
    return (
      <Wrapper inline={inline} className={className}>
        <HiddenInput
          type="file"
          onChange={this.handleUpload}
          innerRef={this.inputRef}
        />
        <Button
          color="primary"
          size={inline ? 'sm' : 'lg'}
          onClick={this.handleClick}
          className={className}
        >
          {text ? text : 'Upload save-game'}
        </Button>
      </Wrapper>
    );
  }

  private parseItems(xmlDoc: XMLDocument, searchString: string) {
    const items = this.items;
    $(xmlDoc)
      .find(searchString)
      .each(function() {
        let id = 0;
        try {
          id = parseInt(
            $(this)
              .find('parentSheetIndex')
              .text(),
            10
          );
          if (giftIDs.indexOf(id) > -1) {
            const count = parseInt(
              $(this)
                .find('Stack')
                .text(),
              10
            );
            items[id] = (items[id] || 0) + count;
          }
        } catch (err) {
          // TODO: Add proper error handling
          console.log('Failed to get item count for ' + id);
        }
      });
  }

  private gatherItems(xmlDoc: XMLDocument) {
    this.items = {};
    this.parseItems(xmlDoc, 'player > items > Item[xsi\\:type="Object"]');
    this.parseItems(
      xmlDoc,
      'locations > GameLocation[xsi\\:type="FarmHouse"] > fridge > items > Item[xsi\\:type="Object"]'
    );
    this.parseItems(
      xmlDoc,
      'Object[xsi\\:type="Chest"] > items > Item[xsi\\:type="Object"]'
    );
    this.props.itemsActions.updateItems(this.items);
    delete this.items;
  }

  private findGiftCount(xmlDoc: XMLDocument) {
    const setGiftCount = this.props.charactersActions.setGiftCount;
    $(xmlDoc)
      .find('player > friendships > item')
      .each(function() {
        let char = 'unknown';
        try {
          char = $(this)
            .find('key > string')
            .html();
          const count = parseInt(
            $(this)
              .find('value > ArrayOfInt > int')
              .first()
              .next()
              .text(),
            10
          );
          setGiftCount({ char, count });
        } catch (err) {
          // TODO: Add proper error handling
          console.log('Failed to update data for ' + char + '\n' + err);
        }
      });
  }

  private handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadstart = this.onLoadStart;
      reader.onprogress = this.onProgress;
      reader.onload = this.onLoad;

      reader.readAsText(file);
    }
  };

  private handleClick = () => {
    if (this.inputRef.current) {
      this.inputRef.current.click();
    }
  };

  private onLoadStart = (ev: FileReaderProgressEvent) => {
    this.props.statusActions.setLoading(true);
  };

  private onProgress = (ev: FileReaderProgressEvent) => {
    if (ev.lengthComputable) {
      this.props.statusActions.setLoading(true);
    }
  };

  private onLoad = (ev: FileReaderProgressEvent) => {
    this.props.statusActions.setLoading(true);
    try {
      if (ev.target) {
        const xmlDoc = $.parseXML(ev.target.result);
        this.gatherItems.call(this, xmlDoc);
        this.props.statusActions.setLoading(true);
        this.findGiftCount.call(this, xmlDoc);
        this.props.statusActions.setLoading(true);
        this.props.statusActions.setLoading(false);
        this.props.statusActions.setSaveGame(true);
        this.props.statusActions.setIntroChosen(true);
        if (this.inputRef.current) {
          this.inputRef.current.value = '';
        }
      }
    } catch (err) {
      // TODO: Add proper error handling
      console.log('Failed to parse file');
    }
  };
}

function mapStateToProps(state: RootState) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    charactersActions: bindActionCreators(charactersActions, dispatch),
    itemsActions: bindActionCreators(itemsActions, dispatch),
    statusActions: bindActionCreators(statusActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Upload);
