import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import ConnectedApp, { App } from '../App';
import Intro from '../Intro';

describe('App --- REACT-REDUX (Shallow + passing the {store} directly)', () => {
  const initialState = {
    status: { intro: false },
    navigation: {}
  };
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = mount(
      <MemoryRouter>
        <Provider store={store}>
          <ConnectedApp />
        </Provider>
      </MemoryRouter>
    );
  });

  it('should render the into component', () => {
    expect(container).toHaveLength(1);
    expect(container.find(Intro)).toHaveLength(1);
  });

  it('+++ check Prop matches with initialState', () => {
    expect(container.find(App).prop('status')).toEqual(initialState.status);
    expect(container.find(App).prop('navigation')).toEqual({});
  });
});
