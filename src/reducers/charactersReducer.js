import update from 'immutability-helper';
import initialState from './initialState';
import { SET_GIFT_COUNT } from '../actions/actionTypes';

export default function stuff(state = initialState.items, action) {
  switch (action.type) {
    case SET_GIFT_COUNT:
      console.log('SET_GIFT_COUNT Action');
      var newState = state;
      if (!(action.char in state)) {
        newState = update(state, {
          [action.char]: {
            $set: {}
          }
        });
      }
      return update(newState, {
        [action.char]: {
          gifts: {
            $set: action.count
          }
        }
      });
    default:
      return state;
  }
}
