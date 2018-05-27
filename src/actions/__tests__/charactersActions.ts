import { getType } from 'typesafe-actions';
import { CharactersActions } from '../../common/types';
import * as actions from '../charactersActions';

describe('charactersActions', () => {
  it('should create an action to select a gift for a character', () => {
    const char = 'Lewis';
    const itemID = 208;
    const actionType = getType(actions.selectGift);
    const expectedAction: CharactersActions = {
      payload: {
        char,
        itemID
      },
      type: actionType
    };
    expect(actions.selectGift({ char, itemID })).toEqual(expectedAction);
  });

  it('should create an action to de-select a gift for a character', () => {
    const char = 'Lewis';
    const itemID = 208;
    const actionType = getType(actions.deselectGift);
    const expectedAction: CharactersActions = {
      payload: {
        char,
        itemID
      },
      type: actionType
    };
    expect(actions.deselectGift({ char, itemID })).toEqual(expectedAction);
  });

  it('should create an action to set the gift count for a character', () => {
    const char = 'Lewis';
    const count = 2;
    const actionType = getType(actions.setGiftCount);
    const expectedAction: CharactersActions = {
      payload: {
        char,
        count
      },
      type: actionType
    };
    expect(actions.setGiftCount({ char, count })).toEqual(expectedAction);
  });
});
