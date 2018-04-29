import update from 'immutability-helper';
import initialState from './initialState';
import {
  SELECT_GIFT,
  DESELECT_GIFT,
  SET_GIFT_COUNT
} from '../actions/actionTypes';

export default function stuff(state = initialState.items, action) {
  var newState = state;
  if (!(action.char in state)) {
    newState = update(state, {
      [action.char]: {
        $set: {}
      }
    });
  }
  switch (action.type) {
    case SELECT_GIFT:
      // TODO: fail on more than two gifts
      if (!('selected' in state[action.char])) {
        newState = update(newState, {
          [action.char]: {
            selected: {
              $set: []
            }
          }
        });
      }
      return update(newState, {
        [action.char]: {
          selected: {
            $push: [action.gift]
          }
        }
      });
    case DESELECT_GIFT:
      // TODO: implement action
      return state;
    case SET_GIFT_COUNT:
      console.log('SET_GIFT_COUNT Action');
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
