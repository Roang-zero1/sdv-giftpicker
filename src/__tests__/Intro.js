import { mount, shallow } from 'enzyme';

import Intro from '../Intro';
import NoSaveButton from '../components/NoSaveButton';
import { Provider } from 'react-redux';
import React from 'react';
import Upload from '../components/Upload';
import configureStore from 'redux-mock-store';
import initialState from '../reducers/initialState';
import renderer from 'react-test-renderer';

describe('Intro --- Shallow render component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Intro />);
  });

  it('should render the one component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('Intro --- Render component', () => {
  const mockStore = configureStore();
  let component, store;
  beforeEach(() => {
    store = mockStore(initialState);
    component = mount(
      <Provider store={store}>
        <Intro />
      </Provider>
    );
  });

  it('should render self and sub-components', () => {
    expect(component).toHaveLength(1);

    expect(component.find(Upload)).toHaveLength(1);
    expect(component.find(NoSaveButton)).toHaveLength(1);
  });

  it('should be the same as the last snapshot', () => {
    const renderValue = renderer.create(component).toJSON();

    expect(renderValue).toMatchSnapshot();
  });
});
