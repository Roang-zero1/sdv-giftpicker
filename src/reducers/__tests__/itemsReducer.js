import reducer from '../itemsReducer';
import * as types from '../../actions/actionTypes';
import initialState from '../initialState';

describe('itemsReducer', () => {
  it('should update the item data with new value', () => {
    let itemsData = { 200: 15, 208: 30 };
    let state = { 150: 15 };
    state = reducer(state, { type: types.UPDATE_ITEMS, items: itemsData });
    expect(state).toEqual(itemsData);
  });

  it('should increment an item count', () => {
    let state = { 150: 15 };
    state = reducer(state, {
      type: types.INCREMENT_ITEM_COUNT,
      id: 150,
      increment: 1
    });
    expect(state).toEqual({ 150: 16 });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.items);
  });
});
