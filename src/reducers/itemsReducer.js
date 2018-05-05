import { INCREMENT_ITEM_COUNT, UPDATE_ITEMS } from '../actions/actionTypes';

import initialState from './initialState';
import update from 'immutability-helper';

export default function items(state = initialState.items, action) {
  switch (action.type) {
    case INCREMENT_ITEM_COUNT:
      return update(state, {
        [action.id]: {
          $set: (state[action.id] || 0) + action.increment
        }
      });
    case UPDATE_ITEMS:
      return action.items;
    default:
      return state;
  }
}
