import { combineReducers } from 'redux';
import characters from './charactersReducer';
import items from './itemsReducer';
import status from './statusReducer';

const rootReducer = combineReducers({
  characters,
  items,
  status
});

export default rootReducer;
