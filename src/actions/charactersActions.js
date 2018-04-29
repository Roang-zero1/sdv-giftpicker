import * as types from './actionTypes';

export function setGiftCount(character, count) {
  return {
    type: types.SET_GIFT_COUNT,
    char: character,
    count: count
  };
}

export function selectGift(character, itemID) {
  return {
    type: types.SELECT_GIFT,
    char: character,
    gift: itemID
  };
}

export function deselectGift(character, itemID) {
  return {
    type: types.DESELECT_GIFT,
    char: character,
    gift: itemID
  };
}
