import ConnectedGiftPicker, { GiftPicker } from '../GiftPicker';

import GiftButton from '../GiftButton';
import React from 'react';
import configureStore from 'redux-mock-store';
import giftTastes from '../../data/GiftTastes.json';
import initialState from '../../reducers/initialState';
import { shallow } from 'enzyme';

const charName = 'Lewis';

describe('component/GiftButton --- Shallow rendered component', () => {
  let cut;

  beforeEach(() => {
    cut = shallow(<GiftPicker char={charName} />);
  });

  it('should render the component', () => {
    expect(cut).toHaveLength(1);
  });

  it('should have a header row', () => {
    expect(cut.find('HeaderRow')).toHaveLength(1);
    expect(cut.find('CharacterImage')).toHaveLength(1);
  });

  it('should render buttons for all relevant gifts', () => {
    let sum = 0;
    sum = Object.keys(giftTastes[charName]).reduce(
      (total, key) => total + giftTastes[charName][key].length,
      0
    );
    expect(cut.find(GiftButton)).toHaveLength(sum);
  });
});

describe('component/GiftButton --- Shallow rendered connected component', () => {
  const mockStore = configureStore();
  let renderedCut;
  let store;
  let state;
  const cut = () => {
    if (!renderedCut) {
      store = mockStore(state);
      renderedCut = shallow(
        <ConnectedGiftPicker char={charName} store={store} />
      );
    }
    return renderedCut;
  };
  beforeEach(() => {
    renderedCut = undefined;
    store = mockStore(state);
  });

  it('should render the selected gift', () => {
    state = {
      ...initialState,
      characters: { Lewis: { selected: [20] } }
    };

    let headerRow = cut()
      .dive()
      .find('HeaderRow');

    expect(headerRow.find(GiftButton)).toHaveLength(1);
  });
});
