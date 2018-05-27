import ConnectedNoSaveButton, { NoSaveButton } from '../NoSaveButton';
import { mount, shallow } from 'enzyme';

import { Provider } from 'react-redux';
import React from 'react';
import configureStore from 'redux-mock-store';
import giftIDs from '../../data/Gifts';
import initialState from '../../reducers/initialState';
import toJSON from 'enzyme-to-json';
import * as statusActions from '../../actions/statusActions';
import * as itemsActions from '../../actions/itemsActions';
import { isActionOf } from 'typesafe-actions';

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
      inline: undefined,
      text: undefined
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
  let cut;
  let store;

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
    let setLoading = actions.filter(isActionOf(statusActions.setLoading));
    expect(setLoading).toHaveLength(2);
    expect(setLoading[0].payload).toEqual(true);
    expect(setLoading[1].payload).toEqual(false);

    let setSaveGame = actions.filter(isActionOf(statusActions.setSaveGame));
    expect(setSaveGame).toHaveLength(1);
    expect(setSaveGame[0].payload).toEqual(false);

    let setIntroChosen = actions.filter(
      isActionOf(statusActions.setIntroChosen)
    );
    expect(setIntroChosen).toHaveLength(1);
    expect(setIntroChosen[0].payload).toEqual(true);

    expect(
      Object.keys(
        actions.filter(isActionOf(itemsActions.updateItems))[0].payload
      )
    ).toHaveLength(giftIDs.length);
  });
});
