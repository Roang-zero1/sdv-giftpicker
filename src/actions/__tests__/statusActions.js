import * as actions from '../statusActions';
import * as types from '../actionTypes';

describe('statusActions', () => {
  it('should create an action to set the intro status', () => {
    const expectedAction = {
      intro: true,
      type: types.SET_INTRO_CHOSEN
    };
    expect(actions.setIntroChosen(true)).toEqual(expectedAction);
  });

  it('should create an action to set the default intro status', () => {
    const expectedAction = {
      intro: false,
      type: types.SET_INTRO_CHOSEN
    };
    expect(actions.setIntroChosen()).toEqual(expectedAction);
  });

  it('should create an action to set the save game status', () => {
    const expectedAction = {
      save: true,
      type: types.SET_SAVE_GAME
    };
    expect(actions.setSaveGame(true)).toEqual(expectedAction);
  });

  it('should create an action to set the default save game status', () => {
    const expectedAction = {
      save: false,
      type: types.SET_SAVE_GAME
    };
    expect(actions.setSaveGame()).toEqual(expectedAction);
  });

  it('should create an action to set the loading status', () => {
    const expectedAction = {
      loading: true,
      type: types.SET_LOADING
    };
    expect(actions.setLoading(true)).toEqual(expectedAction);
  });

  it('should create an action to set the default loading status', () => {
    const expectedAction = {
      loading: false,
      type: types.SET_LOADING
    };
    expect(actions.setLoading()).toEqual(expectedAction);
  });
});
