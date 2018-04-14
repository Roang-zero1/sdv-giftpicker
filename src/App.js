import React, { Component } from 'react';
import { Jumbotron, Progress } from 'reactstrap';
import Upload from './Upload';
//import classNames from 'classnames';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateProgress = this.updateProgress.bind(this);
    this.state = { progress: { label: '', active: true, value: 25 } };
  }
  render() {
    const progress = this.state.progress.active ? (
      <div className="container" id="progress">
        <h2>Progress</h2>
        {this.state.progress.label ? (
          <label>{this.state.progress.label}</label>
        ) : null}
        <Progress value={this.state.progress.value} />
      </div>
    ) : (
      <div className="container" id="help">
        <h2>Help</h2>
        <p>
          Please use the full save file named with your farmer's name and a
          9-digit ID number (e.g.
          <code>Fred_148093307</code>); do not use the <code>SaveGameInfo</code>{' '}
          file as it does not contain all the necessary information.
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
      </div>
    );
    return (
      <main className="App">
        <Jumbotron className="App-header">
          <div className="container">
            <h1 className="display-3">SDV Gift Picker</h1>
            <p>
              Use this site to check which gifts you have available for the
              characters of{' '}
              <a href="http://stardewvalley.net/">Stardew Valley</a>. The save
              is no uploaded and processed locally.
            </p>
            <Upload onProgressChange={this.updateProgress} />
          </div>
        </Jumbotron>
        {progress}
        {/* TODO: Add an about referencing the used tools*/}
        <div className="container" id="about">
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
        </div>
      </main>
    );
  }

  updateProgress(value, label = '', active = true) {
    console.log(label);
    this.setState({ progress: { label: label, active: active, value: value } });
  }
}

export default App;
