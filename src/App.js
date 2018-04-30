import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import classNames from 'classnames';
import { Route, withRouter, Redirect, Switch } from 'react-router-dom';
import { animateScroll as scroll } from 'react-scroll';

import { Container, Row } from 'reactstrap';

import About from './components/About';
import DataDisplay from './components/DataDisplay';
import GiftPicker from './components/GiftPicker';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Intro from './Intro';
import Sidebar from './components/Sidebar';

import './App.css';

class App extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      console.log('scroll');
      scroll.scrollToTop({ to: 0, containerId: 'main', duration: 0 });
    }
  }

  render() {
    if (this.props.status.intro) {
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
                    {this.props.status.loading && <Loader />}
                    {!this.props.status.loading && (
                      <Switch>
                        <Route
                          exact
                          path="/"
                          render={() => (
                            <DataDisplay
                              giftsMetaData={
                                require('./data/GiftsData.js').default
                              }
                            />
                          )}
                        />
                        <Route
                          path="/character/:characterName"
                          render={match => (
                            <GiftPicker
                              giftsMetaData={
                                require('./data/GiftsData.js').default
                              }
                              match={match}
                            />
                          )}
                        />
                        <Redirect to="/" />
                      </Switch>
                    )}
                    <About />
                  </Row>
                </Container>
              </main>
            </Row>
          </Container>
        </div>
      );
    } else {
      return <Intro />;
    }
  }
}

function mapStateToProps(state) {
  return {
    status: state.status,
    navigation: state.navigation
  };
}

export default withRouter(connect(mapStateToProps)(hot(module)(App)));
