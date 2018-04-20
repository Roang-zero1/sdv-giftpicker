import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';

import { Jumbotron, Container } from 'reactstrap';

import Loader from './Loader';
import Upload from './Upload';
import DataDisplay from './DataDisplay';

import './App.css';

class App extends Component {
  render() {
    var content;
    if (this.props.status.loaded) {
      content = (
        <DataDisplay giftsMetaData={require('./data/GiftsData.js').default} />
      );
    } else if (this.props.status.progress.active) {
      content = <Loader />;
    } else {
      content = (
        <Container id="help">
          <h2>Help</h2>
          <p>
            Please use the full save file named with your farmer's name and a
            9-digit ID number (e.g.
            <code>Fred_148093307</code>); do not use the{' '}
            <code>SaveGameInfo</code> file as it does not contain all the
            necessary information.
          </p>
          <p>Default save file locations are:</p>
          <div>
            <ul>
              <li>
                Windows: <code>%AppData%\StardewValley\Saves\</code>
              </li>
              <li>
                Mac OSX &amp; Linux: <code>~/.config/StardewValley/Saves/</code>
              </li>
            </ul>
          </div>
        </Container>
      );
    }
    return (
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
        {/* TODO: Add an about referencing the used tools*/}
        <Container id="about">
          <h2>About</h2>
          <p>
            SDV Gift Calculator by{' '}
            <a href="https://www.reddit.com/user/Roang_zero1/">Roang_Zero1</a>.
          </p>
          <p>
            This app was inspired by <strong>Stardew Checkup</strong> availalbe
            at{' '}
            <a href="https://mouseypounds.github.io/stardew-checkup/">
              https://mouseypounds.github.io/stardew-checkup/
            </a>
          </p>
        </Container>
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.status
  };
}

export default connect(mapStateToProps)(hot(module)(App));
