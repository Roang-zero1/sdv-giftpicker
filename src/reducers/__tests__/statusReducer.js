import reducer from '../statusReducer';
import * as types from '../../actions/actionTypes';
import initialState from '../initialState';

describe('statusReducer', () => {
  it('should should change the save property', () => {
    let state = { save: false };
    state = reducer(state, { type: types.SET_SAVE_GAME, save: true });
    expect(state).toEqual({ save: true });
  });

  it('should should change the loading property', () => {
    let state = { loading: false };
    state = reducer(state, { type: types.SET_LOADING, loading: true });
    expect(state).toEqual({ loading: true });
  });

  it('should should change the loading property', () => {
    let state = { intro: false };
    expect(
      reducer(state, { type: types.SET_INTRO_CHOSEN, intro: true })
    ).toEqual({ intro: true });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.status);
  });
});
