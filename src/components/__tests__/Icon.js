import 'jest-styled-components';

import { mount, shallow } from 'enzyme';

import Icon from '../Icon';
import React from 'react';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';

const giftID = 22;

describe('components/Icon --- Shallow render component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<Icon gift={giftID} />);
  });

  it('should render the one component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('components/Icon --- Render component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Icon gift={giftID} />);
  });

  it('should render the one component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});

describe('components/GiftButton --- Styles', () => {
  let props;
  let renderedIcon;

  const icon = () => {
    if (!renderedIcon) {
      renderedIcon = renderer
        .create(<Icon gift={giftID} {...props} />)
        .toJSON();
    }
    return renderedIcon;
  };

  beforeEach(() => {
    renderedIcon = undefined;
    props = {};
  });

  it('should gray out icons when grayscale is applied', () => {
    props = { grayscale: true };
    expect(icon()).toHaveStyleRule('filter', 'grayscale(100%)');
  });
});
