import { Container, Row } from 'reactstrap';
import { mount, shallow } from 'enzyme';

import About from '../components/About';
import ConnectedApp from '../App';
import { MemoryRouter } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { Provider } from 'react-redux';
import React from 'react';
import Sidebar from '../components/Sidebar';
import configureStore from 'redux-mock-store';
import initialState from '../reducers/initialState';

describe('App --- Shallow render component', () => {
  const mockStore = configureStore();
  let component, store;
  beforeEach(() => {
    store = mockStore(initialState);
    component = shallow(<ConnectedApp store={store} />);
  });

  it('should render the component', () => {
    expect(component).toHaveLength(1);
  });

  it('should set the props correctly', () => {
    expect(component.prop('navigation')).toEqual(initialState.navigation);
  });
});

describe('App --- Render component', () => {
  const mockStore = configureStore();
  let component, store;
  beforeEach(() => {
    store = mockStore(initialState);
    component = mount(
      <MemoryRouter>
        <Provider store={store}>
          <ConnectedApp />
        </Provider>
      </MemoryRouter>
    );
  });

  it('should render self and sub-components', () => {
    expect(component).toHaveLength(1);
    expect(component.find(Navigation)).toHaveLength(1);
    expect(component.find(About)).toHaveLength(1);
    expect(component.find(Sidebar)).toHaveLength(0);

    expect(component.find(Container)).toHaveLength(2);
    expect(component.find(Row)).toHaveLength(2);
  });

  it('should not show the sidebar', () => {
    expect(component.find(Sidebar)).toHaveLength(0);
  });
});

describe('App --- Render component with sidebar', () => {
  const mockStore = configureStore();
  let component, store;
  beforeEach(() => {
    store = mockStore({
      ...initialState,
      navigation: { sidebar: true }
    });
    component = mount(
      <MemoryRouter>
        <Provider store={store}>
          <ConnectedApp />
        </Provider>
      </MemoryRouter>
    );
  });

  it('should render self and sub-components', () => {
    expect(component).toHaveLength(1);
    expect(component.find(Navigation)).toHaveLength(1);
    expect(component.find(About)).toHaveLength(1);
    expect(component.find(Sidebar)).toHaveLength(1);

    expect(component.find(Container)).toHaveLength(2);
    expect(component.find(Row)).toHaveLength(2);
  });

  it('should not show the sidebar', () => {
    expect(component.find(Sidebar)).toHaveLength(1);
  });
});
