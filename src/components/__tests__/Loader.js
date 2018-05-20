import Loader from '../Loader';
import React from 'react';
import { shallow } from 'enzyme';

describe('components/Loader --- Shallow render component', () => {
  let cut;

  beforeEach(() => {
    cut = shallow(<Loader />);
  });

  it('should render the one component', () => {
    expect(cut.length).toEqual(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(cut).toMatchSnapshot();
  });
});
