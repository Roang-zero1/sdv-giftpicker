import * as types from './actionTypes';

export function incrementItemCount(item_ID, increment) {
  return {
    type: types.INCREMENT_ITEM_COUNT,
    id: item_ID,
    increment: increment
  };
}

export function updateItems(items) {
  return { type: types.UPDATE_ITEMS, items: items };
}
