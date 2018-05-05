import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { persistor, store } from './store/configureStore';

import AppRoutes from './AppRoutes';
import Loader from './components/Loader';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loader />} persistor={persistor}>
      <AppRoutes />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
