import characters from './charactersReducer';
import { combineReducers } from 'redux';
import items from './itemsReducer';
import navigation from './navigationReducer';
import status from './statusReducer';

const rootReducer = combineReducers({
  characters,
  items,
  navigation,
  status
});

export default rootReducer;
