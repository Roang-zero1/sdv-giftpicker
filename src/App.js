import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { animateScroll as scroll } from 'react-scroll';

import { Container, Row } from 'reactstrap';

import About from './components/About';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';

import './App.css';

class App extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      scroll.scrollToTop({ to: 0, containerId: 'main', duration: 0 });
    }
  }

  render() {
    return (
      <div>
        <Navigation />
        <Container fluid={true}>
          <Row id="wrapper">
            {this.props.navigation.sidebar && <Sidebar />}
            <main
              id="main"
              className={classNames({
                'p-1': true
              })}
            >
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

function mapStateToProps(state) {
  return {
    navigation: state.navigation
  };
}

export default connect(mapStateToProps)(App);
