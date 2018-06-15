import { getType } from 'typesafe-actions';
import { StatusActions } from '../../common/types';
import * as actions from '../statusActions';

describe('statusActions', () => {
  it('should create an action to set the intro status', () => {
    const actionType = getType(actions.setIntroChosen);
    const expectedAction: StatusActions = {
      payload: true,
      type: actionType
    };
    expect(actions.setIntroChosen(true)).toEqual(expectedAction);
  });

  it('should create an action to set the default intro status', () => {
    const actionType = getType(actions.setIntroChosen);
    const expectedAction: StatusActions = {
      payload: false,
      type: actionType
    };
    expect(actions.setIntroChosen(false)).toEqual(expectedAction);
  });

  it('should create an action to set the save game status', () => {
    const actionType = getType(actions.setSaveGame);
    const expectedAction: StatusActions = {
      payload: true,
      type: actionType
    };
    expect(actions.setSaveGame(true)).toEqual(expectedAction);
  });

  it('should create an action to set the default save game status', () => {
    const actionType = getType(actions.setSaveGame);
    const expectedAction: StatusActions = {
      payload: false,
      type: actionType
    };
    expect(actions.setSaveGame(false)).toEqual(expectedAction);
  });

  it('should create an action to set the loading status', () => {
    const actionType = getType(actions.setLoading);
    const expectedAction: StatusActions = {
      payload: true,
      type: actionType
    };
    expect(actions.setLoading(true)).toEqual(expectedAction);
  });

  it('should create an action to set the default loading status', () => {
    const actionType = getType(actions.setLoading);
    const expectedAction: StatusActions = {
      payload: false,
      type: actionType
    };
    expect(actions.setLoading(false)).toEqual(expectedAction);
  });
});
