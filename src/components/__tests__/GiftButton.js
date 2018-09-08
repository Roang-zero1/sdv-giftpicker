import 'jest-styled-components';

import ConnectedGiftButton, { GiftButton } from '../GiftButton';
import { mount, shallow } from 'enzyme';

import React from 'react';
import configureStore from 'redux-mock-store';
import giftsData from '../../data/GiftsData.json';
import initialState from '../../reducers/initialState';
import toJson from 'enzyme-to-json';
import * as charactersActions from '../../actions/charactersActions';
import { getType } from 'typesafe-actions';

const giftID = 20;
const charName = 'Lewis';

const defaultProps = {
  characters: { Lewis: {} },
  items: {},
  status: { save: true }
};

describe('components/GiftButton --- Shallow render connected component', () => {
  let renderedCut;
  let props;

  const cut = () => {
    if (!renderedCut) {
      renderedCut = shallow(
        <GiftButton gift={20} char={charName} {...props} />
      );
    }
    return renderedCut;
  };

  beforeEach(() => {
    renderedCut = undefined;
    props = defaultProps;
  });

  it('should render the component', () => {
    expect(cut()).toHaveLength(1);
    expect(cut().find('Gift')).toHaveLength(1);
    expect(cut().find('StyledButton')).toHaveLength(1);
    expect(cut().find('GiftText')).toHaveLength(1);
    expect(cut().find('GiftIcon')).toHaveLength(1);
  });

  it('should render the component with a count', () => {
    expect(cut().find('GiftCount')).toHaveLength(1);
  });

  it('should render the component without a count', () => {
    props = {
      ...props,
      status: { save: false }
    };
    expect(cut().find('GiftCount')).toHaveLength(0);
  });

  it('should change the color for selected gifts', () => {
    props = {
      ...props,
      characters: { Lewis: { selected: [20] } }
    };
    expect(
      cut()
        .find('StyledButton')
        .prop('color')
    ).toEqual('success');
  });

  it('should be the same as the last snapshot', () => {
    expect(toJson(cut())).toMatchSnapshot();
  });
});

describe('components/GiftButton --- Render connected component', () => {
  let renderedCut;
  let props;

  const cut = () => {
    if (!renderedCut) {
      renderedCut = mount(
        <GiftButton gift={giftID} char={charName} {...props} />
      );
    }
    return renderedCut;
  };

  beforeEach(() => {
    renderedCut = undefined;
    props = defaultProps;
  });

  it('should render the gift name', () => {
    expect(
      cut()
        .find('GiftText')
        .text()
    ).toEqual(giftsData[giftID].displayName);
  });

  it('should render the component with a count of zero', () => {
    expect(
      cut()
        .find('GiftCount')
        .text()
    ).toEqual('0');
  });

  it('should render the component with a count of zero if there is a negative count', () => {
    let count = -2;
    props = {
      ...props,
      items: {
        20: count
      }
    };
    expect(
      cut()
        .find('GiftCount')
        .text()
    ).toEqual(`0`);
  });

  it('should render the component with the correct count', () => {
    let count = 120;
    props = {
      ...props,
      items: {
        20: count
      }
    };
    expect(
      cut()
        .find('GiftCount')
        .text()
    ).toEqual(`${count}`);
  });

  it('should add an css order if the item is not in the current items', () => {
    expect(
      toJson(
        cut()
          .find('Gift')
          .children()
          .first()
      )
    ).toHaveStyleRule('order', '1');
  });

  it('should add an css order if the item has a count of 0', () => {
    props = {
      ...props,
      items: {
        '20': 0
      }
    };
    expect(
      toJson(
        cut()
          .find('Gift')
          .children()
          .first()
      )
    ).toHaveStyleRule('order', '1');
  });

  it('should be the same as the last snapshot', () => {
    expect(toJson(cut())).toMatchSnapshot();
  });
});

describe('components/GiftButton --- Connected component tests', () => {
  const mockStore = configureStore();
  let renderedGiftButton;
  let store;
  let props;

  const cut = () => {
    const state = {
      ...initialState,
      ...defaultProps
    };
    store = mockStore(state);
    if (!renderedGiftButton) {
      renderedGiftButton = mount(
        <ConnectedGiftButton
          gift={giftID}
          char={charName}
          store={store}
          {...props}
        />
      );
    }
    return renderedGiftButton;
  };

  beforeEach(() => {
    renderedGiftButton = undefined;
    props = {};
  });

  it('should add a gift on button press', () => {
    let button = cut().find('Button');
    button.simulate('click');
    let actions = store.getActions();
    expect(actions[0]).toEqual({
      payload: {
        char: charName,
        itemID: giftID
      },
      type: getType(charactersActions.selectGift)
    });
  });

  it('should remove a gift on button press', () => {
    props = {
      ...props,
      deselect: true
    };
    let button = cut().find('Button');
    button.simulate('click');
    let actions = store.getActions();
    expect(actions[0]).toEqual({
      payload: {
        char: charName,
        itemID: giftID
      },
      type: getType(charactersActions.deselectGift)
    });
  });
});
