import { combineReducers } from 'redux';
import items from './itemsReducer';
import status from './statusReducer';

const rootReducer = combineReducers({
  items,
  status
});

export default rootReducer;
