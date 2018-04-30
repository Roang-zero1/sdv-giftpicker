import * as actions from '../itemActions';
import * as types from '../actionTypes';

describe('charactersActions', () => {
  it('should create an action to update the item data', () => {
    const items = { 200: 30, 208: 50 };
    const expectedAction = {
      type: types.UPDATE_ITEMS,
      items: items
    };
    expect(actions.updateItems(items)).toEqual(expectedAction);
  });

  it('should create an action to increment an item count', () => {
    const item = 200;
    const increment = 10;
    const expectedAction = {
      type: types.INCREMENT_ITEM_COUNT,
      id: item,
      increment: increment
    };
    expect(actions.incrementItemCount(item, increment)).toEqual(expectedAction);
  });
});
