import React, { Component } from 'react';
import {
  Redirect,
  Route,
  BrowserRouter as Router,
  Switch
} from 'react-router-dom';

import App from './App';
import DataDisplay from './components/DataDisplay';
import GiftPicker from './components/GiftPicker';
import Intro from './Intro';
import Loader from './components/Loader';
import { connect } from 'react-redux';
import { hot } from 'react-hot-loader';
import { animateScroll as scroll } from 'react-scroll';
import tastes from './data/GiftTastes.js';

export class AppRoutes extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      scroll.scrollToTop({ to: 0, containerId: 'main', duration: 0 });
    }
  }

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Switch>
          {(this.props.status.intro || false) && (
            <Redirect from="/intro" to="/" />
          )}
          <Route path="/intro" component={Intro} />
          {!(this.props.status.intro || false) && <Redirect to="/intro" />}

          <App>
            {this.props.status.loading && <Loader />}
            {!this.props.status.loading && (
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => (
                    <DataDisplay
                      giftsMetaData={require('./data/GiftsData.js').default}
                    />
                  )}
                />
                <Route
                  path="/character/:characterName"
                  render={match => {
                    if (match.match.params.characterName in tastes) {
                      return (
                        <GiftPicker
                          giftsMetaData={require('./data/GiftsData.js').default}
                          match={match}
                        />
                      );
                    } else {
                      return <Redirect to="/" />;
                    }
                  }}
                />
                <Redirect to="/" />
              </Switch>
            )}
          </App>
        </Switch>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: state.status
  };
}

export default connect(mapStateToProps)(hot(module)(AppRoutes));
