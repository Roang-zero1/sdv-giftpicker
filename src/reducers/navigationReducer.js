import { TOGGLE_SIDEBAR } from '../actions/actionTypes';
import update from 'immutability-helper';

export default function navigation(state = {}, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      return update(state, {
        sidebar: { $set: !state.sidebar }
      });
    default:
      return state;
  }
}
