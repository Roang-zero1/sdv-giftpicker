import update from 'immutability-helper';
import ActionTypes from '../actions/actionTypesTS';
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

export default function status(state = initialState, action: StatusActions) {
  switch (action.type) {
    case ActionTypes.SET_SAVE_GAME:
      return update(state, {
        save: { $set: action.payload }
      });
    case ActionTypes.SET_INTRO_CHOSEN:
      return update(state, {
        intro: { $set: action.payload }
      });
    case ActionTypes.SET_LOADING:
      return update(state, {
        loading: { $set: action.payload }
      });
    default:
      return state;
  }
}
