import { modifyItemCount, updateItems } from '../../actions/itemsActions';
import { initialState, IState } from '../itemsReducer';
import reducer from '../itemsReducer';

describe('itemsReducer', () => {
  it('should update the item data with new value', () => {
    const itemsData: IState = { 200: 15, 208: 30 };
    const initialTestState: IState = { 150: 15 };
    const newState: IState = reducer(initialTestState, updateItems(itemsData));
    expect(newState).toEqual(itemsData);
  });

  it('should increment an item count', () => {
    const initialTestState: IState = { 150: 15 };
    const newState: IState = reducer(
      initialTestState,
      modifyItemCount({ itemID: 150, amount: 1 })
    );
    expect(newState).toEqual({ 150: 16 });
  });

  it('should return the initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
