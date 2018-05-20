import 'jest-styled-components';

import { mount, shallow } from 'enzyme';

import Icon from '../Icon';
import React from 'react';
import toJson from 'enzyme-to-json';

const giftID = 22;

describe('components/Icon --- Shallow render component', () => {
  let cut;
  let props;

  beforeEach(() => {
    props = {};
    cut = shallow(<Icon gift={giftID} {...props} />);
  });

  it('should render the one component', () => {
    expect(cut.length).toEqual(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(cut).toMatchSnapshot();
  });
});

describe('components/Icon --- Render component', () => {
  let renderedCut;
  let props;

  const cut = () => {
    if (!renderedCut) {
      renderedCut = mount(<Icon gift={giftID} {...props} />);
    }
    return renderedCut;
  };

  beforeEach(() => {
    renderedCut = undefined;
    props = {};
  });

  it('should render the one component', () => {
    expect(cut().length).toEqual(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(cut()).toMatchSnapshot();
  });

  it('should gray out icons when grayscale is applied', () => {
    props = { grayscale: true };
    expect(toJson(cut().find('img'))).toHaveStyleRule(
      'filter',
      'grayscale(100%)'
    );
  });
});
