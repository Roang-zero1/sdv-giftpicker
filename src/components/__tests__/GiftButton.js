import 'jest-styled-components';

import ConnectedGiftButton, { GiftButton } from '../GiftButton';
import { DESELECT_GIFT, SELECT_GIFT } from '../../actions/actionTypes';
import { mount, shallow } from 'enzyme';

import React from 'react';
import configureStore from 'redux-mock-store';
import giftsData from '../../data/GiftsData';
import initialState from '../../reducers/initialState';
import toJson from 'enzyme-to-json';

const giftID = 20;
const charName = 'Lewis';

const defaultProps = {
  items: {},
  characters: { Lewis: {} },
  status: { save: true }
};

describe('components/GiftButton --- Shallow render connected component', () => {
  let shallowGiftButton;
  let props;
  const giftButton = () => {
    if (!shallowGiftButton) {
      shallowGiftButton = shallow(
        <GiftButton gift={20} char={charName} {...props} />
      );
    }
    return shallowGiftButton;
  };

  beforeEach(() => {
    shallowGiftButton = undefined;
    props = defaultProps;
  });

  it('should render the component', () => {
    expect(giftButton()).toHaveLength(1);
    expect(giftButton().find('Gift')).toHaveLength(1);
    expect(giftButton().find('StyledButton')).toHaveLength(1);
    expect(giftButton().find('GiftText')).toHaveLength(1);
    expect(giftButton().find('Icon')).toHaveLength(1);
  });

  it('should render the component with a count', () => {
    expect(giftButton().find('GiftCount')).toHaveLength(1);
  });

  it('should render the component without a count', () => {
    props = {
      ...props,
      status: { save: false }
    };
    expect(giftButton().find('GiftCount')).toHaveLength(0);
  });

  it('should change the color for selected gifts', () => {
    props = {
      ...props,
      characters: { Lewis: { selected: [20] } }
    };
    expect(
      giftButton()
        .find('StyledButton')
        .prop('color')
    ).toEqual('success');
  });

  it('should be the same as the last snapshot', () => {
    expect(toJson(giftButton())).toMatchSnapshot();
  });
});

describe('components/GiftButton --- Render connected component', () => {
  let renderedGiftButton;
  let props;
  const giftButton = () => {
    if (!renderedGiftButton) {
      renderedGiftButton = mount(
        <GiftButton gift={giftID} char={charName} {...props} />
      );
    }
    return renderedGiftButton;
  };

  beforeEach(() => {
    renderedGiftButton = undefined;
    props = defaultProps;
  });

  it('should render the gift name', () => {
    expect(
      giftButton()
        .find('GiftText')
        .text()
    ).toEqual(giftsData[giftID].displayName);
  });

  it('should render the component with a count of zero', () => {
    expect(
      giftButton()
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
      giftButton()
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
      giftButton()
        .find('GiftCount')
        .text()
    ).toEqual(`${count}`);
  });

  it('should add an css order if the item is not in the current items', () => {
    expect(
      toJson(
        giftButton()
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
        giftButton()
          .find('Gift')
          .children()
          .first()
      )
    ).toHaveStyleRule('order', '1');
  });

  it('should be the same as the last snapshot', () => {
    expect(toJson(giftButton())).toMatchSnapshot();
  });
});

describe('components/GiftButton --- Connected component tests', () => {
  const mockStore = configureStore();
  let renderedGiftButton;
  let store;
  let props;
  const giftButton = () => {
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
    let button = giftButton().find('Button');
    button.simulate('click');
    let actions = store.getActions();
    expect(actions[0]).toEqual({
      char: charName,
      gift: giftID,
      type: SELECT_GIFT
    });
  });

  it('should remove a gift on button press', () => {
    props = {
      ...props,
      deselect: true
    };
    let button = giftButton().find('Button');
    button.simulate('click');
    let actions = store.getActions();
    expect(actions[0]).toEqual({
      char: charName,
      gift: giftID,
      type: DESELECT_GIFT
    });
  });
});
