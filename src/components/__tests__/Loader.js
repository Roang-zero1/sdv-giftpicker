import Loader from '../Loader';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('components/Loader --- Shallow render component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Loader />);
  });

  it('should render the one component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('components/Loader --- Snapshot', () => {
  it('should be the same as the last snapshot', () => {
    const renderValue = renderer.create(<Loader />).toJSON();

    expect(renderValue).toMatchSnapshot();
  });
});
