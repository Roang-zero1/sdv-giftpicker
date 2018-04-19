import initialState from './initialState';
import update from 'immutability-helper';
import { SET_LOADED, SET_PROGRESS } from '../actions/actionTypes';

export default function stuff(state = initialState.status, action) {
  switch (action.type) {
    case SET_LOADED:
      console.log('SET_LOADED Action');
      return update(state, {
        loaded: { $set: action.loaded }
      });
    case SET_PROGRESS:
      console.log('SET_PROGRESS Action');
      return update(state, {
        progress: { $set: action.progress }
      });
    default:
      return state;
  }
}
