import 'jest-styled-components';

import { mount, shallow } from 'enzyme';

import Icon from '../Icon';
import React from 'react';
import toJson from 'enzyme-to-json';

const giftID = 22;

describe('components/Icon --- Shallow render component', () => {
  let wrapper;
  let props;

  beforeEach(() => {
    props = {};
    wrapper = shallow(<Icon gift={giftID} {...props} />);
  });

  it('should render the one component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

describe('components/Icon --- Render component', () => {
  let renderedIcon;
  let props;

  const icon = () => {
    if (!renderedIcon) {
      renderedIcon = mount(<Icon gift={giftID} {...props} />);
    }
    return renderedIcon;
  };

  beforeEach(() => {
    renderedIcon = undefined;
    props = {};
  });

  it('should render the one component', () => {
    expect(icon().length).toEqual(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(icon()).toMatchSnapshot();
  });

  it('should gray out icons when grayscale is applied', () => {
    props = { grayscale: true };
    expect(toJson(icon().find('img'))).toHaveStyleRule(
      'filter',
      'grayscale(100%)'
    );
  });
});
