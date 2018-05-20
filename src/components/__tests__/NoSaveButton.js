import * as actionTypes from '../../actions/actionTypes';

import ConnectedNoSaveButton, { NoSaveButton } from '../NoSaveButton';
import { mount, shallow } from 'enzyme';

import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import giftIDs from '../../data/Gifts';
import initialState from '../../reducers/initialState';
import toJSON from 'enzyme-to-json';

describe('components/NoSaveButton --- Shallow render component', () => {
  let cut;

  beforeEach(() => {
    cut = shallow(<NoSaveButton />);
  });

  it('should render the one component', () => {
    expect(cut).toHaveLength(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(toJSON(cut)).toMatchSnapshot();
  });
});

describe('components/NoSaveButton --- Render component', () => {
  let renderedCut;
  let props;
  const cut = () => {
    if (!renderedCut) {
      renderedCut = mount(<NoSaveButton {...props} />);
    }
    return renderedCut;
  };

  beforeEach(() => {
    renderedCut = undefined;
    props = {
      text: undefined,
      inline: undefined
    };
  });

  it('should render the one component', () => {
    expect(cut()).toHaveLength(1);
  });

  describe('when `text` is defined ', () => {
    beforeEach(() => {
      props.text = 'Remove Save Game';
      cut();
    });

    it('should render the passed text', () => {
      expect(cut().prop('text')).toBe(props.text);
      expect(
        cut()
          .find('Button')
          .text()
      ).toEqual(props.text);
    });
  });

  describe('when `inline` is defined ', () => {
    beforeEach(() => {
      props.inline = true;
    });

    it('should add a css class when inline', () => {
      expect(
        cut()
          .find('button')
          .hasClass('btn-sm')
      ).toEqual(true);
    });
  });
});

describe('components/NoSaveButton --- Shallow render connected component', () => {
  const mockStore = configureStore();
  let cut, store;

  beforeEach(() => {
    store = mockStore(initialState);
    cut = mount(
      <Provider store={store}>
        <ConnectedNoSaveButton />
      </Provider>
    );
  });

  it('should render the one component', () => {
    expect(cut).toHaveLength(1);
  });

  it('should handle the onClick action correctly', () => {
    expect(store.getState()).toEqual(initialState);
    cut.find('button').simulate('click');
    let actions = store.getActions();
    let setLoading = actions.filter(
      action => action.type === actionTypes.SET_LOADING
    );
    expect(setLoading).toHaveLength(2);
    expect(setLoading[0].loading).toEqual(true);
    expect(setLoading[1].loading).toEqual(false);

    let setSaveGame = actions.filter(
      action => action.type === actionTypes.SET_SAVE_GAME
    );
    expect(setSaveGame).toHaveLength(1);
    expect(setSaveGame[0].save).toEqual(false);

    let setIntroChosen = actions.filter(
      action => action.type === actionTypes.SET_INTRO_CHOSEN
    );
    expect(setIntroChosen).toHaveLength(1);
    expect(setIntroChosen[0].intro).toEqual(true);

    expect(
      Object.keys(
        actions.filter(action => action.type === actionTypes.UPDATE_ITEMS)[0]
          .items
      )
    ).toHaveLength(giftIDs.length);
  });
});
