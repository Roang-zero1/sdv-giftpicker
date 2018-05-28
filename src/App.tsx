import * as React from 'react';
import { Component } from 'react';
import { Container, Row } from 'reactstrap';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { NavigationState, RootState } from './common/types';
import About from './components/About';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';

interface IStateProps {
  navigation: NavigationState;
}

const Wrapper = styled(Row)`
  overflow: hidden;
  height: calc(100vh - 58px);
`;

const Main = styled.main`
  overflow-y: auto;
  flex: 1 1 50vw;
  height: auto;
`;

class App extends Component<IStateProps> {
  public render() {
    const { sidebar } = this.props.navigation;
    return (
      <div>
        <Navigation />
        <Container fluid={true}>
          <Wrapper>
            {sidebar && <Sidebar />}
            <Main className="p-1">
              <Container>
                <Row>
                  {this.props.children}
                  <About />
                </Row>
              </Container>
            </Main>
          </Wrapper>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state: RootState) {
  return {
    navigation: state.navigation
  };
}

export default connect(mapStateToProps)(App);
