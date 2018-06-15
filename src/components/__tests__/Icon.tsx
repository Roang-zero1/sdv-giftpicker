import 'jest-styled-components';

import { mount, ReactWrapper, shallow, ShallowWrapper } from 'enzyme';

import toJson from 'enzyme-to-json';
import * as React from 'react';
import Icon, { IProps } from '../Icon';

const gift = 22;

describe('components/Icon --- Shallow render component', () => {
  let cut: ShallowWrapper;
  let props: IProps;

  beforeEach(() => {
    props = { gift };
    cut = shallow(<Icon {...props} />);
  });

  it('should render the one component', () => {
    expect(cut.length).toEqual(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(cut).toMatchSnapshot();
  });
});

describe('components/Icon --- Render component', () => {
  let renderedCut: ReactWrapper | undefined;
  let props: IProps;

  const cut = () => {
    if (!renderedCut) {
      renderedCut = mount(<Icon {...props} />);
    }
    return renderedCut;
  };

  beforeEach(() => {
    renderedCut = undefined;
    props = { gift };
  });

  it('should render the one component', () => {
    expect(cut().length).toEqual(1);
  });

  it('should be the same as the last snapshot', () => {
    expect(cut()).toMatchSnapshot();
  });

  it('should gray out icons when grayscale is applied', () => {
    props = { ...props, grayscale: true };
    expect(toJson(cut().find('img'))).toHaveStyleRule(
      'filter',
      'grayscale(100%)'
    );
  });
});
