import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import { persistor, store } from './store/configureStore';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import AppRoutes from './AppRoutes';
import Loader from './components/Loader';
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
