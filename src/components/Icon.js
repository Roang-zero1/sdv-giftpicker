import React, { Component } from 'react';
import styled, { css } from 'styled-components';

import PropTypes from 'prop-types';
import images from '../data/GiftImages';

const Img = styled.img`
  left: -12px;
  position: relative;
  max-width: 24px;
  ${props =>
    props.grayscale &&
    css`
      filter: grayscale(100%);
    `};
`;

class Icon extends Component {
  render() {
    const { gift, grayscale } = this.props;
    return <Img grayscale={grayscale} src={images[gift]} alt="" />;
  }
}

Icon.propTypes = {
  gift: PropTypes.number.isRequired,
  grayscale: PropTypes.bool
};

export default Icon;
