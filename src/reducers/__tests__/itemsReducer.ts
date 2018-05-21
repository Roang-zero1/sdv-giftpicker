import { modifyItemCount, updateItems } from '../../actions/itemsActions';
import { IItems } from '../../common/types';
import { initialState } from '../itemsReducer';
import reducer from '../itemsReducer';

export interface IState {
  readonly [itemID: number]: number;
}
describe('itemsReducer', () => {
  it('should update the item data with new value', () => {
    const itemsData: IItems = { 200: 15, 208: 30 };
    let state: IItems = { 150: 15 };
    state = reducer(state, updateItems(itemsData));
    expect(state).toEqual(itemsData);
  });

  it('should increment an item count', () => {
    let state: IItems = { 150: 15 };
    state = reducer(state, modifyItemCount({ itemID: 150, amount: 1 }));
    expect(state).toEqual({ 150: 16 });
  });

  it('should return the initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
