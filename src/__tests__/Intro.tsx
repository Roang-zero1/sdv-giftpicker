import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NoSaveButton from '../components/NoSaveButton';
import Upload from '../components/Upload';
import Intro from '../Intro';
import initialState from '../reducers/initialState';

describe('Intro --- Shallow render component', () => {
  let cut: ShallowWrapper;

  beforeEach(() => {
    cut = shallow(<Intro />);
  });

  it('should render the one component', () => {
    expect(cut.length).toEqual(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(cut).toMatchSnapshot();
  });
});

describe('Intro --- Render connected component', () => {
  const mockStore = configureStore();
  let cut: ReactWrapper;
  let store;
  beforeEach(() => {
    store = mockStore(initialState);
    cut = mount(
      <Provider store={store}>
        <Intro />
      </Provider>
    );
  });

  it('should render self and sub-components', () => {
    expect(cut).toHaveLength(1);

    expect(cut.find(Upload)).toHaveLength(1);
    expect(cut.find(NoSaveButton)).toHaveLength(1);
  });
});
