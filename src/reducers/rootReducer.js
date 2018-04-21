import { combineReducers } from 'redux';
import characters from './charactersReducer';
import items from './itemsReducer';
import status from './statusReducer';
import navigation from './navigationReducer';

const rootReducer = combineReducers({
  characters,
  items,
  navigation,
  status
});

export default rootReducer;
