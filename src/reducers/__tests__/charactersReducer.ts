import {
  deselectGift,
  selectGift,
  setGiftCount
} from '../../actions/charactersActions';
import reducer, { initialState, IState } from '../charactersReducer';

const char = 'Lewis';
describe('statusReducer', () => {
  it('should should change the save property', () => {
    const count = 2;
    const initialTestState: IState = { Lewis: { gifts: 1, selected: [] } };
    const newState = reducer(initialTestState, setGiftCount({ char, count }));
    expect(newState).toEqual({ Lewis: { gifts: 2, selected: [] } });
  });

  it('should add the selected gift to the character', () => {
    const initialTestState: IState = { Lewis: { gifts: 0, selected: [] } };
    const newState = reducer(
      initialTestState,
      selectGift({ char, itemID: 208 })
    );
    expect(newState.Lewis.selected.length).toEqual(1);
    expect(newState).toEqual({ Lewis: { gifts: 0, selected: [208] } });
  });

  it('should not add more than 2 gits', () => {
    const initialTestState: IState = {
      Lewis: { gifts: 0, selected: [208, 200] }
    };
    const newState = reducer(
      initialTestState,
      selectGift({ char, itemID: 208 })
    );
    expect(newState.Lewis.selected.length).toEqual(2);
    expect(newState).toEqual({ Lewis: { gifts: 0, selected: [200, 208] } });
  });

  it('should deselect the chosen gift', () => {
    const initialTestState: IState = {
      Lewis: { gifts: 0, selected: [208, 200] }
    };
    const newState = reducer(
      initialTestState,
      deselectGift({ char, itemID: 208 })
    );
    expect(newState.Lewis.selected.length).toEqual(1);
    expect(newState).toEqual({ Lewis: { gifts: 0, selected: [200] } });
  });

  it('should deselect only chosen gifts', () => {
    const initialTestState: IState = {
      Lewis: { gifts: 0, selected: [208, 200] }
    };
    const newState = reducer(
      initialTestState,
      deselectGift({ char, itemID: 408 })
    );
    expect(newState).toEqual({ Lewis: { gifts: 0, selected: [208, 200] } });
    expect(newState.Lewis.selected.length).toEqual(2);
  });

  it('should not fail to deselect on no chosen gifts', () => {
    const initialTestState = {};
    const newState = reducer(
      initialTestState,
      deselectGift({ char, itemID: 408 })
    );
    expect(newState).toEqual({ Lewis: { gifts: 0, selected: [] } });
    expect(newState.Lewis.selected.length).toEqual(0);
  });

  it('should not add more than 2 gits', () => {
    const initialTestState: IState = {
      Lewis: { gifts: 0, selected: [208, 200] }
    };
    const newState = reducer(
      initialTestState,
      deselectGift({ char, itemID: 208 })
    );
    expect(newState.Lewis.selected.length).toEqual(1);
    expect(newState).toEqual({ Lewis: { gifts: 0, selected: [200] } });
  });

  it('should return the initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
