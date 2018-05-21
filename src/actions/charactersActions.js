import * as types from './actionTypes';

export function setGiftCount(character, count) {
  return {
    char: character,
    count: count,
    type: types.SET_GIFT_COUNT
  };
}

export function selectGift(character, itemID) {
  return {
    char: character,
    gift: itemID,
    type: types.SELECT_GIFT
  };
}

export function deselectGift(character, itemID) {
  return {
    char: character,
    gift: itemID,
    type: types.DESELECT_GIFT
  };
}
