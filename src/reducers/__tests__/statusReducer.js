import status from '../statusReducer';
import * as types from '../../actions/actionTypes';

describe('statusReducer', () => {
  it('should should change the save property', () => {
    let state = { save: false };
    state = status(state, { type: types.SET_SAVE_GAME, save: true });
    expect(state).toEqual({ save: true });
  });

  it('should should change the loading property', () => {
    let state = { loading: false };
    state = status(state, { type: types.SET_LOADING, loading: true });
    expect(state).toEqual({ loading: true });
  });

  it('should should change the loading property', () => {
    let state = { intro: false };
    state = status(state, { type: types.SET_INTRO_CHOSEN, intro: true });
    expect(state).toEqual({ intro: true });
  });

  it('should keep the state steady', () => {
    let state = { save: true };
    state = status(state, { type: 'NONE' });
    expect(state).toEqual({ save: true });
  });
});
