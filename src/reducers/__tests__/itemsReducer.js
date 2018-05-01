import items from '../itemsReducer';
import * as types from '../../actions/actionTypes';

describe('itemsReducer', () => {
  it('should update the item data with new value', () => {
    let itemsData = { 200: 15, 208: 30 };
    let state = { 150: 15 };
    state = items(state, { type: types.UPDATE_ITEMS, items: itemsData });
    expect(state).toEqual(itemsData);
  });

  it('should increment an item count', () => {
    let state = { 150: 15 };
    state = items(state, {
      type: types.INCREMENT_ITEM_COUNT,
      id: 150,
      increment: 1
    });
    expect(state).toEqual({ 150: 16 });
  });

  it('should keep the state steady', () => {
    let state = { 150: 15 };
    state = items(state, { type: 'NONE' });
    expect(state).toEqual({ 150: 15 });
  });
});
