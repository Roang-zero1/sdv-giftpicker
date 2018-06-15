import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import * as items from '../actions/itemsActions';
import { ItemsActions } from '../common/types';

export interface IState {
  readonly [itemID: number]: number;
}

export const initialState: IState = {};

export default (state: IState = initialState, action: ItemsActions): IState => {
  switch (action.type) {
    case getType(items.modifyItemCount):
      return update(state, {
        [action.payload.itemID]: {
          $set: (state[action.payload.itemID] || 0) + action.payload.amount
        }
      });
    case getType(items.updateItems):
      return action.payload;
    default:
      return state;
  }
};
