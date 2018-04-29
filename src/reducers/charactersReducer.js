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
      if (!('selected' in newState[action.char])) {
        newState = update(newState, {
          [action.char]: {
            selected: {
              $set: []
            }
          }
        });
      }
      newState = update(newState, {
        [action.char]: {
          selected: {
            $push: [action.gift]
          }
        }
      });
      return update(newState, {
        [action.char]: {
          selected: {
            $set: newState[action.char].selected.slice(-2)
          }
        }
      });
    case DESELECT_GIFT:
      if (!('selected' in newState[action.char])) {
        newState = update(newState, {
          [action.char]: {
            selected: {
              $set: []
            }
          }
        });
      }
      let index = newState[action.char].selected.findIndex(
        k => k === action.gift
      );
      return update(newState, {
        [action.char]: {
          selected: {
            $splice: [[index, 1]]
          }
        }
      });
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
