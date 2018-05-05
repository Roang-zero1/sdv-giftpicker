import './App.css';

import { Container, Row } from 'reactstrap';
import React, { Component } from 'react';

import About from './components/About';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { animateScroll as scroll } from 'react-scroll';

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
