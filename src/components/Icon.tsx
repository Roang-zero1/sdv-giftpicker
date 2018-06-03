import * as React from 'react';
import { Component } from 'react';
import styled from 'styled-components';

import images from '../data/GiftImages';

export interface IProps {
  gift: number;
  grayscale?: boolean;
}

interface IImgProps {
  grayscale?: boolean;
}

const Img = styled<IImgProps, 'img'>('img')`
  max-width: 24px;
  filter: ${props => (props.grayscale ? 'grayscale(100%)' : undefined)};
`;

class Icon extends Component<IProps> {
  public render() {
    const { gift, grayscale } = this.props;
    return <Img grayscale={grayscale} src={images[gift]} alt="" />;
  }
}

export default Icon;
