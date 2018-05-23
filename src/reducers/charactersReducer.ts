import update from 'immutability-helper';
import ActionTypes from '../actions/actionTypesTS';
import { CharacterAction } from '../common/types';

export interface IState {
  readonly [character: string]: {
    readonly selected: number[];
    readonly gifts: number;
  };
}

export const initialState: IState = {};

export default function characters(
  state: IState = initialState,
  action: CharacterAction
): IState {
  let char: string = '';
  let newState = state;
  switch (action.type) {
    case ActionTypes.SELECT_GIFT:
    case ActionTypes.DESELECT_GIFT:
    case ActionTypes.SET_GIFT_COUNT:
      char = action.payload.char;

      if (!(char in state)) {
        newState = update(state, {
          [char]: {
            $set: {
              gifts: 0,
              selected: []
            }
          }
        });
      }
  }

  let itemID: number;
  switch (action.type) {
    case ActionTypes.SELECT_GIFT:
      itemID = action.payload.itemID;
      newState = update(newState, {
        [char]: {
          selected: {
            $push: [itemID]
          }
        }
      });
      return update(newState, {
        [char]: {
          selected: {
            $set: newState[char].selected.slice(-2)
          }
        }
      });
    case ActionTypes.DESELECT_GIFT:
      itemID = action.payload.itemID;
      const index = newState[char].selected.findIndex(
        (k: number) => k === itemID
      );
      return index >= 0
        ? update(newState, {
            [char]: {
              selected: {
                $splice: [[index, 1]]
              }
            }
          })
        : newState;
    case ActionTypes.SET_GIFT_COUNT:
      return update(newState, {
        [char]: {
          gifts: {
            $set: action.payload.count
          }
        }
      });
    default:
      return state;
  }
}