import About from '../About';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('components/About --- Shallow render component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<About />);
  });

  it('should render the one component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('components/About --- Snapshot', () => {});
