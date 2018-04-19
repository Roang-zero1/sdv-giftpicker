import initialState from './initialState';
import update from 'immutability-helper';
import { SET_LOADED } from '../actions/actionTypes';

export default function stuff(state = initialState.status, action) {
  switch (action.type) {
    case SET_LOADED:
      console.log('SET_LOADED Action');
      return update(state, {
        loaded: { $set: true }
      });
    default:
      return state;
  }
}
