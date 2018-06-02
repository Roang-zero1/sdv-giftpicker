import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import { Container, Row } from 'reactstrap';

import * as React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedApp from '../App';
import About from '../components/About';
import Navigation from '../components/Navigation';
import Sidebar from '../components/Sidebar';
import initialState from '../reducers/initialState';

describe('App --- Shallow render component', () => {
  const mockStore = configureStore();
  let cut: ShallowWrapper;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    cut = shallow(<ConnectedApp />, { context: { store } });
  });

  it('should render the cut', () => {
    expect(cut).toHaveLength(1);
  });

  it('should set the props correctly', () => {
    expect(cut.prop('navigation')).toEqual(initialState.navigation);
  });
});

describe('App --- Render component without sidebar', () => {
  const mockStore = configureStore();
  let cut: ReactWrapper;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    cut = mount(
      <MemoryRouter>
        <Provider store={store}>
          <ConnectedApp />
        </Provider>
      </MemoryRouter>
    );
  });

  it('should render self and sub-components', () => {
    expect(cut).toHaveLength(1);
    expect(cut.find(Navigation)).toHaveLength(1);
    expect(cut.find(About)).toHaveLength(1);
    expect(cut.find(Sidebar)).toHaveLength(0);

    expect(cut.find(Container)).toHaveLength(2);
    expect(cut.find(Row)).toHaveLength(2);
  });

  it('should not show the sidebar', () => {
    expect(cut.find(Sidebar)).toHaveLength(0);
  });
});

describe('App --- Render component with sidebar', () => {
  const mockStore = configureStore();
  let cut: ReactWrapper;
  let store;
  beforeEach(() => {
    store = mockStore({
      ...initialState,
      navigation: { sidebar: true }
    });
    cut = mount(
      <MemoryRouter>
        <Provider store={store}>
          <ConnectedApp />
        </Provider>
      </MemoryRouter>
    );
  });

  it('should render self and sub-components', () => {
    expect(cut).toHaveLength(1);
    expect(cut.find(Navigation)).toHaveLength(1);
    expect(cut.find(About)).toHaveLength(1);
    expect(cut.find(Sidebar)).toHaveLength(1);

    expect(cut.find(Container)).toHaveLength(2);
    expect(cut.find(Row)).toHaveLength(2);
  });

  it('should not show the sidebar', () => {
    expect(cut.find(Sidebar)).toHaveLength(1);
  });
});
