import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import About from './components/About';
import DataDisplay from './components/DataDisplay';
import Loader from './components/Loader';
import Intro from './Intro';

//import './App.css';

class App extends Component {
  render() {
    if (this.props.status.loaded || this.props.status.loading) {
      return (
        <div>
          <main className="App">
            {this.props.status.loading && <Loader />}
            {this.props.status.loaded && (
              <DataDisplay
                giftsMetaData={require('./data/GiftsData.js').default}
              />
            )}
            <About />
          </main>
        </div>
      );
    } else {
      return <Intro />;
    }
  }
}

function mapStateToProps(state) {
  return {
    status: state.status
  };
}

export default connect(mapStateToProps)(hot(module)(App));
