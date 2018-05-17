import Icon from '../Icon';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('components/Icon --- Shallow render component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Icon gift={22} />);
  });

  it('should render the one component', () => {
    expect(wrapper.length).toEqual(1);
  });
});

describe('components/Icon --- Snapshot', () => {
  it('should be the same as the last snapshot', () => {
    const renderValue = renderer.create(<Icon gift={22} />).toJSON();

    expect(renderValue).toMatchSnapshot();
  });
});
