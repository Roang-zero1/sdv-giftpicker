import { CharacterAction } from '../../common/types';
import ActionTypes from '../actionTypesTS';
import * as actions from '../charactersActions';

describe('charactersActions', () => {
  it('should create an action to select a gift for a character', () => {
    const char = 'Lewis';
    const itemID = 208;
    const expectedAction: CharacterAction = {
      payload: {
        char,
        itemID
      },
      type: ActionTypes.SELECT_GIFT
    };
    expect(actions.selectGift({ char, itemID })).toEqual(expectedAction);
  });

  it('should create an action to de-select a gift for a character', () => {
    const char = 'Lewis';
    const itemID = 208;
    const expectedAction: CharacterAction = {
      payload: {
        char,
        itemID
      },
      type: ActionTypes.DESELECT_GIFT
    };
    expect(actions.deselectGift({ char, itemID })).toEqual(expectedAction);
  });

  it('should create an action to set the gift count for a character', () => {
    const char = 'Lewis';
    const count = 2;
    const expectedAction: CharacterAction = {
      payload: {
        char,
        count
      },
      type: ActionTypes.SET_GIFT_COUNT
    };
    expect(actions.setGiftCount({ char, count })).toEqual(expectedAction);
  });
});
