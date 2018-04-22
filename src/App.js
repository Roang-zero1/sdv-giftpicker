import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import classNames from 'classnames';

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
  render() {
    if (this.props.status.loaded || this.props.status.loading) {
      return (
        <div>
          <Navigation />
          <Container fluid={true}>
            <Row id="wrapper">
              {this.props.navigation.sidebar && <Sidebar />}
              <main
                className={classNames({
                  'p-1': true
                })}
              >
                <Container>
                  <Row>
                    {this.props.status.loading && <Loader />}
                    {this.props.status.loaded &&
                      !this.props.navigation.selection && (
                        <DataDisplay
                          giftsMetaData={require('./data/GiftsData.js').default}
                        />
                      )}
                    {this.props.navigation.selection && (
                      <GiftPicker
                        giftsMetaData={require('./data/GiftsData.js').default}
                      />
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

export default connect(mapStateToProps)(hot(module)(App));
