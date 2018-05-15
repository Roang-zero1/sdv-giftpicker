import * as actionTypes from '../../actions/actionTypes';

import ConnectedNoSaveButton, { NoSaveButton } from '../NoSaveButton';
import { mount, shallow } from 'enzyme';

import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import giftIDs from '../../data/Gifts';
import initialState from '../../reducers/initialState';
import renderer from 'react-test-renderer';

describe('components/NoSaveButton --- Shallow render component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<NoSaveButton />);
  });

  it('should render the one component', () => {
    expect(component).toHaveLength(1);
  });
});

describe('components/NoSaveButton --- Render component', () => {
  let shallowNoSaveButton;
  let props;
  const noSaveButton = () => {
    if (!shallowNoSaveButton) {
      shallowNoSaveButton = mount(<NoSaveButton {...props} />);
    }
    return shallowNoSaveButton;
  };

  beforeEach(() => {
    shallowNoSaveButton = undefined;
    props = {
      text: undefined,
      inline: undefined
    };
  });

  it('should render the one component', () => {
    expect(noSaveButton()).toHaveLength(1);
  });

  describe('when `text` is defined ', () => {
    beforeEach(() => {
      props.text = 'Remove Save Game';
      noSaveButton();
    });

    it('should render the passed text', () => {
      expect(shallowNoSaveButton.prop('text')).toBe(props.text);
      expect(shallowNoSaveButton.find('Button').text()).toEqual(props.text);
    });
  });

  describe('when `inline` is defined ', () => {
    beforeEach(() => {
      props.inline = true;
      noSaveButton();
    });

    it('should add a css class when inline', () => {
      expect(shallowNoSaveButton.find('button').hasClass('btn-sm')).toEqual(
        true
      );
    });
  });
});

describe('components/NoSaveButton --- Shallow render connected component', () => {
  const mockStore = configureStore();
  let component, store;

  beforeEach(() => {
    store = mockStore(initialState);
    component = mount(
      <Provider store={store}>
        <ConnectedNoSaveButton />
      </Provider>
    );
  });

  it('should render the one component', () => {
    expect(component).toHaveLength(1);
  });

  it('should handle the onClick action correctly', () => {
    expect(store.getState()).toEqual(initialState);
    component.find('button').simulate('click');
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

describe('components/NoSaveButton --- Snapshot', () => {
  let component;
  beforeEach(() => {
    component = mount(<NoSaveButton />);
  });
  it('should be the same as the last snapshot', () => {
    const renderValue = renderer.create(component).toJSON();

    expect(renderValue).toMatchSnapshot();
  });
});
