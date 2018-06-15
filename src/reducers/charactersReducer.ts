import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import * as actions from '../actions/charactersActions';
import { CharactersActions } from '../common/types';

export interface IState {
  readonly [character: string]: {
    readonly selected: number[];
    readonly gifts: number;
  };
}

export const initialState: IState = {};

export default function characters(
  state: IState = initialState,
  action: CharactersActions
): IState {
  let char: string = '';
  let newState = state;
  switch (action.type) {
    case getType(actions.selectGift):
    case getType(actions.deselectGift):
    case getType(actions.setGiftCount):
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
    case getType(actions.selectGift):
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
    case getType(actions.deselectGift):
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
    case getType(actions.setGiftCount):
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
