import * as charactersActions from '../actions/charactersActions';
import * as itemsActions from '../actions/itemsActions';
import * as statusActions from '../actions/statusActions';

import * as React from 'react';
import { Component, RefObject } from 'react';

import { connect, Dispatch } from 'react-redux';
import { Button } from 'reactstrap';
import { bindActionCreators } from 'redux';
import styled from 'styled-components';
import { IGiftTastes, IItems, RootState } from '../common/types';

/* tslint:disable-next-line:no-var-requires */
const giftIDs: number[] = require('../data/Gifts.json');
/* tslint:disable-next-line:no-var-requires */
const giftTastes: IGiftTastes = require('../data/GiftTastes.json');

interface IWindow extends Window {
  DOMParser: DOMParser | undefined;
  ActiveXObject: any;
}

export interface IDispatchProps {
  charactersActions: typeof charactersActions;
  itemsActions: typeof itemsActions;
  statusActions: typeof statusActions;
}

export interface IProps extends IDispatchProps {
  inline?: boolean;
  text?: string;
  className: string;
}

interface IWrapperProps {
  inline?: boolean;
}

const Wrapper = styled<IWrapperProps, 'div'>('div')`
  display: ${props => (props.inline ? 'inline-block' : undefined)};
`;

const HiddenInput = styled.input`
  display: none;
`;

class Upload extends Component<IProps> {
  private inputRef: RefObject<HTMLInputElement>;
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

  private parseItemsDOM = (
    oDOM: Document,
    nsResolver: XPathNSResolver,
    itemsDOM: IItems,
    searchString: string
  ): IItems => {
    const nodes = oDOM.evaluate(
      searchString,
      oDOM,
      nsResolver,
      XPathResult.ANY_TYPE,
      null
    );
    let result = nodes.iterateNext();
    while (result) {
      const id = oDOM.evaluate(
        'parentSheetIndex',
        result,
        nsResolver,
        XPathResult.NUMBER_TYPE,
        null
      ).numberValue;
      const count = oDOM.evaluate(
        'Stack',
        result,
        nsResolver,
        XPathResult.NUMBER_TYPE,
        null
      ).numberValue;
      if (
        Number.isInteger(id) &&
        Number.isInteger(count) &&
        giftIDs.indexOf(id) > -1
      ) {
        itemsDOM[id] = (itemsDOM[id] || 0) + count;
      }
      result = nodes.iterateNext();
    }
    return itemsDOM;
  };

  private gatherItemsDOM = (oDOM: Document): void => {
    let itemsDOM: IItems = {};
    const nsResolver = oDOM.createNSResolver(oDOM);
    itemsDOM = this.parseItemsDOM(
      oDOM,
      nsResolver,
      itemsDOM,
      '//player/items/Item[@xsi:type="Object"]'
    );
    itemsDOM = this.parseItemsDOM(
      oDOM,
      nsResolver,
      itemsDOM,
      '//locations/GameLocation[@xsi:type="FarmHouse"]/fridge/items/Item[@xsi:type="Object"]'
    );
    itemsDOM = this.parseItemsDOM(
      oDOM,
      nsResolver,
      itemsDOM,
      '//Object[@xsi:type="Chest"]/items/Item[@xsi:type="Object"]'
    );
    this.props.itemsActions.updateItems(itemsDOM);
  };

  private findGiftCount = (oDOM: Document) => {
    const nodes = oDOM.evaluate(
      '//player/friendshipData/item',
      oDOM,
      null,
      XPathResult.ANY_TYPE,
      null
    );
    let result = nodes.iterateNext();
    while (result) {
      const char = oDOM.evaluate(
        'key/string',
        result,
        null,
        XPathResult.STRING_TYPE,
        null
      ).stringValue;

      const count = oDOM.evaluate(
        'value/Friendship/GiftsThisWeek',
        result,
        null,
        XPathResult.NUMBER_TYPE,
        null
      ).numberValue;

      if (char && char in giftTastes && Number.isInteger(count)) {
        this.props.charactersActions.setGiftCount({
          char,
          count
        });
      }

      result = nodes.iterateNext();
    }
  };

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

  private parseXml = (xmlString: string): Document => {
    let oDOM;
    const win = window as IWindow;
    if (typeof win.DOMParser !== 'undefined') {
      const parser = new DOMParser();
      return parser.parseFromString(xmlString, 'text/xml');
    } else if (
      typeof win.ActiveXObject !== 'undefined' &&
      new win.ActiveXObject('Microsoft.XMLDOM')
    ) {
      oDOM = new win.ActiveXObject('Microsoft.XMLDOM');
      oDOM.async = false;
      oDOM.loadXML(xmlString);
      return oDOM;
    } else {
      throw new Error('No XML parser found');
    }

    return oDOM;
  };

  private onLoad = (ev: FileReaderProgressEvent) => {
    this.props.statusActions.setLoading(true);
    try {
      if (ev.target) {
        const oDOM = this.parseXml(ev.target.result);

        console.log(
          oDOM.documentElement.nodeName === 'parsererror'
            ? 'error while parsing'
            : oDOM.documentElement.nodeName
        );

        this.props.statusActions.setLoading(true);
        this.gatherItemsDOM(oDOM);
        this.findGiftCount(oDOM);
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Upload);
