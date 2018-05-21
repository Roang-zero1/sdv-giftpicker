import { StatusActions } from '../../common/types';
import ActionTypes from '../actionTypesTS';
import * as actions from '../statusActions';

describe('statusActions', () => {
  it('should create an action to set the intro status', () => {
    const expectedAction: StatusActions = {
      payload: true,
      type: ActionTypes.SET_INTRO_CHOSEN
    };
    expect(actions.setIntroChosen(true)).toEqual(expectedAction);
  });

  it('should create an action to set the default intro status', () => {
    const expectedAction: StatusActions = {
      payload: false,
      type: ActionTypes.SET_INTRO_CHOSEN
    };
    expect(actions.setIntroChosen(false)).toEqual(expectedAction);
  });

  it('should create an action to set the save game status', () => {
    const expectedAction: StatusActions = {
      payload: true,
      type: ActionTypes.SET_SAVE_GAME
    };
    expect(actions.setSaveGame(true)).toEqual(expectedAction);
  });

  it('should create an action to set the default save game status', () => {
    const expectedAction: StatusActions = {
      payload: false,
      type: ActionTypes.SET_SAVE_GAME
    };
    expect(actions.setSaveGame(false)).toEqual(expectedAction);
  });

  it('should create an action to set the loading status', () => {
    const expectedAction: StatusActions = {
      payload: true,
      type: ActionTypes.SET_LOADING
    };
    expect(actions.setLoading(true)).toEqual(expectedAction);
  });

  it('should create an action to set the default loading status', () => {
    const expectedAction: StatusActions = {
      payload: false,
      type: ActionTypes.SET_LOADING
    };
    expect(actions.setLoading(false)).toEqual(expectedAction);
  });
});
