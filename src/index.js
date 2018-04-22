import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { BrowserRouter as Router } from 'react-router-dom';

import { store, persistor } from './store/configureStore';
import registerServiceWorker from './registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import Loader from './components/Loader';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <Router basename={process.env.PUBLIC_URL}>
        <App />
      </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
