import { PersistConfig, persistReducer, persistStore } from 'redux-persist';

import { createStore, StoreEnhancer } from 'redux';
import storage from 'redux-persist/lib/storage';
import initialState from '../reducers/initialState';
import rootReducer from '../reducers/rootReducer';

const persistConfig: PersistConfig = {
  blacklist: ['navigation'],
  key: 'sdv-gp',
  storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const devTools: StoreEnhancer = (window as any).__REDUX_DEVTOOLS_EXTENSION__
  ? (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  : (f: any) => f;

// @ts-ignore Currently bugged for redux 4.0.0
export const store = createStore(persistedReducer, initialState, devTools);
export const persistor = persistStore(store);
