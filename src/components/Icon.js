import React, { Component } from 'react';
import images from '../data/GiftImages';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Img = styled.img`
  left: -12px;
  position: relative;
  max-width: 24px;
`;

class Icon extends Component {
  render() {
    const { gift } = this.props;
    return <Img className="icon" src={images[gift]} alt="" />;
  }
}

Icon.propTypes = {
  gift: PropTypes.number.isRequired
};

export default Icon;
