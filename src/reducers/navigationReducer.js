import initialState from './initialState';
import update from 'immutability-helper';
import { TOGGLE_SIDEBAR } from '../actions/actionTypes';

export default function stuff(state = initialState.status, action) {
  switch (action.type) {
    case TOGGLE_SIDEBAR:
      console.log('TOGGLE_SIDEBAR Action');
      return update(state, {
        sidebar: { $set: !state.sidebar }
      });
    default:
      return state;
  }
}
