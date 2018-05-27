import './App.css';

import * as React from 'react';
import { Component } from 'react';
import { Container, Row } from 'reactstrap';

import { connect } from 'react-redux';
import { NavigationState, RootState } from './common/types';
import About from './components/About';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';

interface IStateProps {
  navigation: NavigationState;
}

class App extends Component<IStateProps> {
  public render() {
    const { sidebar } = this.props.navigation;
    return (
      <div>
        <Navigation />
        <Container fluid={true}>
          <Row id="wrapper">
            {sidebar && <Sidebar />}
            <main id="main" className="p-1">
              <Container>
                <Row>
                  {this.props.children}
                  <About />
                </Row>
              </Container>
            </main>
          </Row>
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
