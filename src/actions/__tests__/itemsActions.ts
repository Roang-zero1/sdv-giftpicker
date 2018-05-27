import { getType } from 'typesafe-actions';
import { ItemsActions } from '../../common/types';
import { IState } from '../../reducers/itemsReducer';
import * as actions from '../itemsActions';

describe('itemsActions', () => {
  it('should create an action to update the item data', () => {
    const items: IState = { 200: 30, 208: 50 };
    const actionType = getType(actions.updateItems);
    const expectedAction: ItemsActions = {
      payload: items,
      type: actionType
    };
    expect(actions.updateItems(items)).toEqual(expectedAction);
  });

  it('should create an action to increment an item count', () => {
    const item = 200;
    const increment = 10;
    const actionType = getType(actions.modifyItemCount);
    const expectedAction: ItemsActions = {
      payload: {
        amount: increment,
        itemID: item
      },
      type: actionType
    };
    expect(
      actions.modifyItemCount({ itemID: item, amount: increment })
    ).toEqual(expectedAction);
  });
});
