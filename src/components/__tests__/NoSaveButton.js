import { mount, shallow } from 'enzyme';

import { NoSaveButton } from '../NoSaveButton';
import React from 'react';
import renderer from 'react-test-renderer';

describe('components/NoSaveButton --- Shallow render component', () => {
  let component;

  beforeEach(() => {
    component = shallow(<NoSaveButton />);
  });

  it('should render the one component', () => {
    expect(component).toHaveLength(1);
  });
});

describe('components/NoSaveButton --- Render component', () => {
  let shallowNoSaveButton;
  let props;
  const noSaveButton = () => {
    if (!shallowNoSaveButton) {
      shallowNoSaveButton = mount(<NoSaveButton {...props} />);
    }
    return shallowNoSaveButton;
  };

  beforeEach(() => {
    shallowNoSaveButton = undefined;
    props = {
      text: undefined,
      inline: undefined
    };
  });

  it('should render the one component', () => {
    expect(noSaveButton()).toHaveLength(1);
  });

  describe('when `text` is defined ', () => {
    beforeEach(() => {
      props.text = 'Remove Save Game';
      noSaveButton();
    });

    it('should render the passed text', () => {
      expect(shallowNoSaveButton.prop('text')).toBe(props.text);
      expect(shallowNoSaveButton.find('Button').text()).toEqual(props.text);
    });
  });

  describe('when `inline` is defined ', () => {
    beforeEach(() => {
      props.inline = true;
      noSaveButton();
    });

    it('should add a css class when inline', () => {
      expect(shallowNoSaveButton.find('button').hasClass('btn-sm')).toEqual(
        true
      );
    });
  });
});

describe('components/NoSaveButton --- Snapshot', () => {
  let component;
  beforeEach(() => {
    component = mount(<NoSaveButton />);
  });
  it('should be the same as the last snapshot', () => {
    const renderValue = renderer.create(component).toJSON();

    expect(renderValue).toMatchSnapshot();
  });
});
