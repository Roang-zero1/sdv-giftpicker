import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import * as actions from '../actions/navigationActions';
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
    case getType(actions.toggleSidebar):
      return update(state, {
        sidebar: { $set: !state.sidebar }
      });
    default:
      return state;
  }
};
