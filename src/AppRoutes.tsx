import * as React from 'react';
import { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';

import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import App from './App';
import { RootState, StatusState } from './common/types';
import DataDisplay from './components/DataDisplay';
import GiftPicker from './components/GiftPicker';
import Loader from './components/Loader';
import ScrollToTop from './components/ScrollToTop';
import tastes from './data/GiftTastes';
import Intro from './Intro';

export interface IState {
  status: StatusState;
}

export class AppRoutes extends Component<IState> {
  public render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <ScrollToTop>
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
                    exact={true}
                    path="/"
                    render={this.renderDataDisplay}
                  />
                  <Route
                    path="/character/:characterName"
                    render={this.renderGiftPicker}
                  />
                  <Redirect to="/" />
                </Switch>
              )}
            </App>
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }

  private renderDataDisplay = () => {
    return <DataDisplay giftsMetaData={require('./data/GiftsData').default} />;
  };
  private renderGiftPicker = (props: RouteComponentProps<any>) => {
    const char = props.match.params.characterName;
    if (char in tastes) {
      return <GiftPicker char={char} />;
    } else {
      return <Redirect to="/" />;
    }
  };
}

function mapStateToProps(state: RootState): IState {
  return {
    status: state.status
  };
}

export default connect(mapStateToProps)(hot(module)(AppRoutes));
