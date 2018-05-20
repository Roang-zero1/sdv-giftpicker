import About from '../About';
import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

describe('components/About --- Shallow render component', () => {
  let cut;

  beforeEach(() => {
    cut = shallow(<About />);
  });

  it('should render the one component', () => {
    expect(cut.length).toEqual(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(toJson(cut)).toMatchSnapshot();
  });
});

describe('components/About --- Snapshot', () => {});
