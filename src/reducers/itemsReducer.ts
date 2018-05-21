import update from 'immutability-helper';
import ActionTypes from '../actions/actionTypesTS';
import { ItemsActions } from '../common/types';

export interface IState {
  readonly [itemID: number]: number;
}

export const initialState: IState = {};

export default (state: IState = initialState, action: ItemsActions): IState => {
  switch (action.type) {
    case ActionTypes.MODIFY_COUNT:
      return update(state, {
        [action.payload.itemID]: {
          $set: (state[action.payload.itemID] || 0) + action.payload.amount
        }
      });
    case ActionTypes.UPDATE_ITEMS:
      return action.payload;
    default:
      return state;
  }
};
