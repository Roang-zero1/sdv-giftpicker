import initialState from './initialState';
import update from 'immutability-helper';
import {
  SET_SAVE_GAME,
  SET_INTRO_CHOSEN,
  SET_LOADING,
  SET_FLUID_LAYOUT
} from '../actions/actionTypes';

export default function stuff(state = initialState.status, action) {
  switch (action.type) {
    case SET_FLUID_LAYOUT:
      console.log('SET_FLUID_LAYOUT Action');
      return update(state, {
        fluid: { $set: action.fluid }
      });
    case SET_SAVE_GAME:
      console.log('SET_LOADED Action');
      return update(state, {
        save: { $set: action.save }
      });
    case SET_INTRO_CHOSEN:
      console.log('SET_LOADED Action');
      return update(state, {
        intro: { $set: action.intro }
      });
    case SET_LOADING:
      console.log('SET_LOADING Action');
      return update(state, {
        loading: { $set: action.loading }
      });
    default:
      return state;
  }
}
