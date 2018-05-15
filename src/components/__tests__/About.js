import About from '../About';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('components/About --- Shallow render component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<About />);
  });

  it('should render the one component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('components/About --- Snapshot', () => {
  it('should be the same as the last snapshot', () => {
    const renderValue = renderer.create(<About />).toJSON();

    expect(renderValue).toMatchSnapshot();
  });
});
