import { IItems, ItemsActions } from '../../common/types';
import ActionTypes from '../actionTypesTS';
import * as actions from '../itemsActions';

describe('itemsActions', () => {
  it('should create an action to update the item data', () => {
    const items: IItems = { 200: 30, 208: 50 };
    const expectedAction: ItemsActions = {
      payload: items,
      type: ActionTypes.UPDATE_ITEMS
    };
    expect(actions.updateItems(items)).toEqual(expectedAction);
  });

  it('should create an action to increment an item count', () => {
    const item = 200;
    const increment = 10;
    const expectedAction: ItemsActions = {
      payload: {
        amount: increment,
        itemID: item
      },
      type: ActionTypes.MODIFY_COUNT
    };
    expect(
      actions.modifyItemCount({ itemID: item, amount: increment })
    ).toEqual(expectedAction);
  });
});
