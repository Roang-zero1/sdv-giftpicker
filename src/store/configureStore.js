import { persistReducer, persistStore } from 'redux-persist';

import { createStore } from 'redux';
import rootReducer from '../reducers/rootReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'sdv-gp',
  storage,
  blacklist: ['navigation']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export const persistor = persistStore(store);
