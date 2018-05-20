import { GiftButton } from '../GiftButton';
import React from 'react';
import { shallow, mount } from 'enzyme';
import giftsData from '../../data/GiftsData';
import renderer from 'react-test-renderer';
import 'jest-styled-components';

const defaultProps = {
  items: {},
  characters: { Lewis: {} },
  status: { save: true }
};
const giftID = 20;

describe('components/GiftButton --- Shallow render connected component', () => {
  let shallowGiftButton;
  let props;
  const giftButton = () => {
    if (!shallowGiftButton) {
      shallowGiftButton = shallow(
        <GiftButton gift={20} char={'Lewis'} {...props} />
      );
    }
    return shallowGiftButton;
  };

  beforeEach(() => {
    shallowGiftButton = undefined;
    props = defaultProps;
  });

  it('should render the component', () => {
    expect(giftButton()).toHaveLength(1);
    expect(giftButton().find('Gift')).toHaveLength(1);
    expect(giftButton().find('StyledButton')).toHaveLength(1);
    expect(giftButton().find('GiftText')).toHaveLength(1);
    expect(giftButton().find('Icon')).toHaveLength(1);
  });

  it('should render the component with a count', () => {
    expect(giftButton().find('GiftCount')).toHaveLength(1);
  });

  it('should render the component without a count', () => {
    props = {
      ...props,
      status: { save: false }
    };
    expect(giftButton().find('GiftCount')).toHaveLength(0);
  });

  it('should change the color for selected gifts', () => {
    props = {
      ...props,
      characters: { Lewis: { selected: [20] } }
    };
    expect(
      giftButton()
        .find('StyledButton')
        .prop('color')
    ).toEqual('success');
  });
});

describe('components/GiftButton --- Render connected component', () => {
  let renderedGiftButton;
  let props;
  const giftButton = () => {
    if (!renderedGiftButton) {
      renderedGiftButton = mount(
        <GiftButton gift={giftID} char={'Lewis'} {...props} />
      );
    }
    return renderedGiftButton;
  };

  beforeEach(() => {
    renderedGiftButton = undefined;
    props = defaultProps;
  });

  it('should render the gift name', () => {
    expect(
      giftButton()
        .find('GiftText')
        .text()
    ).toEqual(giftsData[giftID].displayName);
  });

  it('should render the component with a count of zero', () => {
    expect(
      giftButton()
        .find('GiftCount')
        .text()
    ).toEqual('0');
  });

  it('should render the component with a count of zero if there is a negative count', () => {
    let count = -2;
    props = {
      ...props,
      items: {
        20: count
      }
    };
    expect(
      giftButton()
        .find('GiftCount')
        .text()
    ).toEqual(`0`);
  });

  it('should render the component with the correct count', () => {
    let count = 120;
    props = {
      ...props,
      items: {
        20: count
      }
    };
    expect(
      giftButton()
        .find('GiftCount')
        .text()
    ).toEqual(`${count}`);
  });
});

describe('components/GiftButton --- Styles', () => {
  let props;
  let renderedGiftButton;

  const giftButton = () => {
    if (!renderedGiftButton) {
      renderedGiftButton = renderer
        .create(<GiftButton gift={20} char={'Lewis'} {...props} />)
        .toJSON();
    }
    return renderedGiftButton;
  };

  beforeEach(() => {
    renderedGiftButton = undefined;
    props = defaultProps;
  });

  it('should add an css order if the item is not in the current items', () => {
    expect(giftButton()).toHaveStyleRule('order', '1');
  });

  it('should add an css order if the item has a count of 0', () => {
    props = {
      ...props,
      items: {
        '20': 0
      }
    };
    expect(giftButton()).toHaveStyleRule('order', '1');
  });
});
