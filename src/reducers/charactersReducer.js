import {
  DESELECT_GIFT,
  SELECT_GIFT,
  SET_GIFT_COUNT
} from '../actions/actionTypes';

import initialState from './initialState';
import update from 'immutability-helper';

export default function characters(state = initialState.characters, action) {
  var newState = state;
  if (!(action.char in state)) {
    newState = update(state, {
      [action.char]: {
        $set: {
          selected: []
        }
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
      return index >= 0
        ? update(newState, {
            [action.char]: {
              selected: {
                $splice: [[index, 1]]
              }
            }
          })
        : newState;
    case SET_GIFT_COUNT:
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
