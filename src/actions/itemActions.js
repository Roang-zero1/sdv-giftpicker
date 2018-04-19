import * as types from './actionTypes';

export function incrementItemCount(item_ID, increment) {
  return {
    type: types.INCREMENT_ITEM_COUNT,
    id: item_ID,
    increment: increment
  };
}

export function resetItemCount(item_ID) {
  return { type: types.RESET_ITEM_COUNT, id: item_ID };
}

export function resetItemCounts() {
  return { type: types.RESET_ITEM_COUNT };
}
