import * as types from './actionTypes';

export function setGiftCount(character, count) {
  return {
    type: types.SET_GIFT_COUNT,
    char: character,
    count: count
  };
}
