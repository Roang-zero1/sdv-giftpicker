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

export const Icon = styled<IImgProps, 'img'>('img')`
  filter: ${props => (props.grayscale ? 'grayscale(100%)' : undefined)};
  height: auto;
  max-width: 24px;
`;

class GiftIcon extends Component<IProps> {
  public render() {
    const { gift, grayscale } = this.props;
    return <Icon grayscale={grayscale} src={images[gift]} alt="" />;
  }
}

export default GiftIcon;
