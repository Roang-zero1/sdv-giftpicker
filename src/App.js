import React, { Component } from 'react';
import { Jumbotron, Button } from 'reactstrap';
import classNames from 'classnames';
import './App.css';

class App extends Component {
  render() {
    return (
      <main className="App">
        <Jumbotron className="App-header">
          <div className="container">
            <h1 className="display-3">SDV Gift Calculator</h1>
            <p>
              Use this site to check which gifts you have available for the
              characters of{' '}
              <a href="http://stardewvalley.net/">Stardew Valley</a>. The save
              is no uploaded and processed locally.
            </p>
            <Button color="primary" className="btn-lg">
              Upload File
            </Button>
          </div>
        </Jumbotron>
        <div className={classNames({ container: true, help: true })}>
          <h2>Help</h2>
          Please use the full save file named with your farmer's name and a
          9-digit ID number (e.g.
          <code>Fred_148093307</code>); do not use the <code>SaveGameInfo</code>{' '}
          file as it does not contain all the necessary information.
          <p>
            Default save file locations are:
            <ul>
              <li>
                Windows: <code>%AppData%\StardewValley\Saves\</code>
              </li>
              <li>
                Mac OSX &amp; Linux: <code>~/.config/StardewValley/Saves/</code>
              </li>
            </ul>
          </p>
        </div>
        {/* TODO: Add an about referencing the used tools*/}
        <div className="container" id="about">
          <h2>About</h2>
          SDV Gift Calculator by{' '}
          <a href="https://www.reddit.com/user/Roang_zero1/">Roang_Zero1</a>
          This app was inspired by <strong>Stardew Checkup</strong> availalbe at{' '}
          <a href="https://mouseypounds.github.io/stardew-checkup/">
            https://mouseypounds.github.io/stardew-checkup/
          </a>
        </div>
      </main>
    );
  }
}

export default App;