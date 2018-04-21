import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Jumbotron, Container } from 'reactstrap';

import * as statusActions from './actions/statusActions';
import Upload from './components/Upload';
import About from './components/About';

import './Intro.css';

class Intro extends Component {
  render() {
    this.props.statusActions.setFluidLayout(false);
    return (
      <main className="App">
        <Jumbotron className="header">
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
        <About />
      </main>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    statusActions: bindActionCreators(statusActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Intro);