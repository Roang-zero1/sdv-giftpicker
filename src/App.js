import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import { Jumbotron, Container } from 'reactstrap';

import Loader from './components/Loader';
import Upload from './components/Upload';
import DataDisplay from './components/DataDisplay';
import About from './components/About';
import Intro from './Intro';

import './App.css';

class App extends Component {
  render() {
    var content;
    if (this.props.status.loaded) {
      content = (
        <DataDisplay giftsMetaData={require('./data/GiftsData.js').default} />
      );
    } else if (this.props.status.loading) {
      content = <Loader />;
    } else {
      return <Intro />;
    }
    return (
      <div>
        <main className="App">
          <Jumbotron className="App-header">
            <Container>
              <h1 className="display-3">SDV Gift Picker</h1>
              <p>
                Use this site to check which gifts you have available for the
                characters of{' '}
                <a href="http://stardewvalley.net/">Stardew Valley</a>. The save
                is no uploaded and processed locally.
              </p>
              <Upload />
            </Container>
          </Jumbotron>
          {content}
          <About />
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.status
  };
}

export default connect(mapStateToProps)(hot(module)(App));
