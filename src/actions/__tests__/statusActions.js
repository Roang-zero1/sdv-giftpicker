import * as actions from '../statusActions';
import * as types from '../actionTypes';

describe('statusActions', () => {
  it('should create an action to set the intro status', () => {
    const expectedAction = {
      type: types.SET_INTRO_CHOSEN,
      intro: true
    };
    expect(actions.setIntroChosen(true)).toEqual(expectedAction);
  });

  it('should create an action to set the default intro status', () => {
    const expectedAction = {
      type: types.SET_INTRO_CHOSEN,
      intro: false
    };
    expect(actions.setIntroChosen()).toEqual(expectedAction);
  });

  it('should create an action to set the save game status', () => {
    const expectedAction = {
      type: types.SET_SAVE_GAME,
      save: true
    };
    expect(actions.setSaveGame(true)).toEqual(expectedAction);
  });

  it('should create an action to set the default save game status', () => {
    const expectedAction = {
      type: types.SET_SAVE_GAME,
      save: false
    };
    expect(actions.setSaveGame()).toEqual(expectedAction);
  });

  it('should create an action to set the loading status', () => {
    const expectedAction = {
      type: types.SET_LOADING,
      loading: true
    };
    expect(actions.setLoading(true)).toEqual(expectedAction);
  });

  it('should create an action to set the default loading status', () => {
    const expectedAction = {
      type: types.SET_LOADING,
      loading: false
    };
    expect(actions.setLoading()).toEqual(expectedAction);
  });
});
