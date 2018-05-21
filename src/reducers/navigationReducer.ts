import update from 'immutability-helper';
import ActionTypes from '../actions/actionTypesTS';
import { NavigationActions } from '../common/types';

export interface IState {
  readonly sidebar: boolean;
}

export const initialState: IState = {
  sidebar: false
};

export default (
  state: IState = initialState,
  action: NavigationActions
): IState => {
  switch (action.type) {
    case ActionTypes.TOGGLE_SIDEBAR:
      return update(state, {
        sidebar: { $set: !state.sidebar }
      });
    default:
      return state;
  }
};
