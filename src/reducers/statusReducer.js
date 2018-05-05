import {
  SET_INTRO_CHOSEN,
  SET_LOADING,
  SET_SAVE_GAME
} from '../actions/actionTypes';

import initialState from './initialState';
import update from 'immutability-helper';

export default function status(state = initialState.status, action) {
  switch (action.type) {
    case SET_SAVE_GAME:
      return update(state, {
        save: { $set: action.save }
      });
    case SET_INTRO_CHOSEN:
      return update(state, {
        intro: { $set: action.intro }
      });
    case SET_LOADING:
      return update(state, {
        loading: { $set: action.loading }
      });
    default:
      return state;
  }
}
