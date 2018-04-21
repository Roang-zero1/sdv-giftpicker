import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import classNames from 'classnames';

import { Container, Row } from 'reactstrap';

import About from './components/About';
import DataDisplay from './components/DataDisplay';
import Loader from './components/Loader';
import Navigation from './components/Navigation';
import Intro from './Intro';
import Sidebar from './components/Sidebar';

import './App.css';

class App extends Component {
  render() {
    if (this.props.status.loaded || this.props.status.loading) {
      return (
        <Container id="App" fluid={true} className="p-0">
          <Navigation />
          <Row id="wrapper" noGutters={true}>
            {this.props.navigation.sidebar && <Sidebar />}
            <main
              className={classNames({
                App: true,
                'col-12': !this.props.navigation.sidebar,
                'col-10': this.props.navigation.sidebar,
                'col-sm-11': this.props.navigation.sidebar,
                'col-md-9': this.props.navigation.sidebar
              })}
            >
              {this.props.status.loading && <Loader />}
              {this.props.status.loaded && (
                <DataDisplay
                  giftsMetaData={require('./data/GiftsData.js').default}
                />
              )}
              <About />
            </main>
          </Row>
        </Container>
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
