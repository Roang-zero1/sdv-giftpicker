import React, { Component } from 'react';
import images from '../data/GiftImages';
import styled from 'styled-components';

const Img = styled.img`
  left: -12px;
  position: relative;
  max-width: 24px;
`;

class Icon extends Component {
  render() {
    return <Img className="icon" src={images[this.props.gift]} alt="" />;
  }
}

export default Icon;
