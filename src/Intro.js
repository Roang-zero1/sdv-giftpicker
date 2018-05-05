import React, { Component } from 'react';

import { Jumbotron, Container, Col } from 'reactstrap';

import Upload from './components/Upload';
import NoSaveButton from './components/NoSaveButton';
import About from './components/About';

import './Intro.css';

class Intro extends Component {
  render() {
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
            <Upload className="mb-2" />
            <NoSaveButton />
          </Container>
        </Jumbotron>
        <Container>
          <Col xs="12">
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
                  Mac OSX &amp; Linux:{' '}
                  <code>~/.config/StardewValley/Saves/</code>
                </li>
              </ul>
            </div>
          </Col>
          <About />
        </Container>
      </main>
    );
  }
}
export default Intro;
