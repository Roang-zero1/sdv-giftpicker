import { shallow, ShallowWrapper } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import About from '../About';

describe('components/About --- Shallow render component', () => {
  let cut: ShallowWrapper;

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
