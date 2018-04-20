import initialState from './initialState';
import update from 'immutability-helper';
import { INCREMENT_ITEM_COUNT, UPDATE_ITEMS } from '../actions/actionTypes';

export default function stuff(state = initialState.items, action) {
  switch (action.type) {
    case INCREMENT_ITEM_COUNT:
      console.log('INCREMENT_ITEM_COUNT Action');
      return update(state, {
        [action.id]: {
          $set: (state[action.id] || 0) + action.increment
        }
      });
    case UPDATE_ITEMS:
      console.log('UPDATE_ITEMS Action');
      return action.items;
    default:
      return state;
  }
}