import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';
import 'jest-styled-components';
import * as React from 'react';
import Loader from '../Loader';

describe('components/Loader --- Shallow render component', () => {
  let cut: ShallowWrapper;

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

describe('components/Loader --- Render component', () => {
  let cut: ReactWrapper;

  beforeEach(() => {
    cut = mount(<Loader />);
  });

  it('should render the one component', () => {
    expect(cut.length).toEqual(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(cut).toMatchSnapshot();
  });
});
