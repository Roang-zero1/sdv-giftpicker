import * as React from 'react';
import { Component } from 'react';

import { Container } from 'reactstrap';
import styled from 'styled-components';

const Wrapper = styled(Container)`
  height: 14em;
`;

const LoaderDiv = styled.div`
  direction: ltr;
  text-indent: -9999em;
  margin: 3em auto;
  position: relative;
  font-size: 11px;
  transform: translateZ(0);

  &,
  &::after,
  &::before {
    background: #222222;
    animation: load1 1s infinite ease-in-out;
    animation-delay: -160ms;
    width: 1em;
    height: 4em;
  }

  &::before,
  &::after {
    position: absolute;
    top: 0;
    content: '';
  }

  &::before {
    left: -1.5em;
    animation-delay: -320ms;
  }

  &::after {
    left: 1.5em;
    animation-delay: 0ms;
  }
  @keyframes load1 {
    0%,
    80%,
    100% {
      box-shadow: 0 0;
      height: 4em;
    }
    40% {
      box-shadow: 0 -2em;
      height: 5em;
    }
  }
`;

class Loader extends Component {
  public render() {
    return (
      <Wrapper>
        <h2>Loading</h2>
        <p>Loading Data please wait</p>
        <LoaderDiv />
      </Wrapper>
    );
  }
}

export default Loader;
