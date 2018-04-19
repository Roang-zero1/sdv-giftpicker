import initialState from './initialState';
import {
  INCREMENT_ITEM_COUNT,
  RESET_ITEM_COUNT,
  RESET_ITEM_COUNTS
} from '../actions/actionTypes';

export default function stuff(state = initialState.items, action) {
  let newState;
  switch (action.type) {
    case INCREMENT_ITEM_COUNT:
      console.log('INCREMENT_ITEM_COUNT Action');
      state[action.id] = (state[action.id] || 0) + action.increment;
      return state;
    case RESET_ITEM_COUNT:
      delete state[action.id];
      newState = state;
      console.log('RESET_ITEM_COUNT Action');
      return newState;
    case RESET_ITEM_COUNTS:
      console.log('RESET_ITEM_COUNTS Action');
      return initialState.items;
    default:
      return state;
  }
}
