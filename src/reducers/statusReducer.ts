import update from 'immutability-helper';
import { getType } from 'typesafe-actions';
import * as actions from '../actions/statusActions';
import { StatusActions } from '../common/types';

export interface IState {
  readonly intro: boolean;
  readonly loading: boolean;
  readonly save: boolean;
}

export const initialState: IState = {
  intro: false,
  loading: false,
  save: false
};

export default (
  state: IState = initialState,
  action: StatusActions
): IState => {
  switch (action.type) {
    case getType(actions.setSaveGame):
      return update(state, {
        save: { $set: action.payload }
      });
    case getType(actions.setIntroChosen):
      return update(state, {
        intro: { $set: action.payload }
      });
    case getType(actions.setLoading):
      return update(state, {
        loading: { $set: action.payload }
      });
    default:
      return state;
  }
};
