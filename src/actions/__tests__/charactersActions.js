import * as actions from '../charactersActions';
import * as types from '../actionTypes';

describe('charactersActions', () => {
  it('should create an action to select a gift for a character', () => {
    const char = 'Lewis';
    const item = 208;
    const expectedAction = {
      type: types.SELECT_GIFT,
      char: char,
      gift: item
    };
    expect(actions.selectGift(char, item)).toEqual(expectedAction);
  });

  it('should create an action to de-select a gift for a character', () => {
    const char = 'Lewis';
    const item = 208;
    const expectedAction = {
      type: types.DESELECT_GIFT,
      char: char,
      gift: item
    };
    expect(actions.deselectGift(char, item)).toEqual(expectedAction);
  });

  it('should create an action to set the gift count for a character', () => {
    const char = 'Lewis';
    const count = 2;
    const expectedAction = {
      type: types.SET_GIFT_COUNT,
      char: char,
      count: count
    };
    expect(actions.setGiftCount(char, count)).toEqual(expectedAction);
  });
});