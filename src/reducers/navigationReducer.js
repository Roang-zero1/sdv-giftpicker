import initialState from './initialState';
import update from 'immutability-helper';
import {
  SELECT_CHARACTER,
  SELECT_OVERVIEW,
  TOGGLE_SIDEBAR
} from '../actions/actionTypes';

export default function stuff(state = initialState.status, action) {
  switch (action.type) {
    case SELECT_CHARACTER:
      console.log('SELECT_CHARACTER Action');
      return update(state, {
        selection: { $set: action.char }
      });
    case SELECT_OVERVIEW:
      console.log('SELECT_OVERVIEW Action');
      let clone = Object.assign({}, state);
      delete clone['selection'];
      return clone;
    case TOGGLE_SIDEBAR:
      console.log('TOGGLE_SIDEBAR Action');
      return update(state, {
        sidebar: { $set: !state.sidebar }
      });
    default:
      return state;
  }
}
