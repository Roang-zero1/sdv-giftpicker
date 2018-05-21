import reducer from '../charactersReducer';
import * as types from '../../actions/actionTypes';
import initialState from '../initialState';

describe('statusReducer', () => {
  it('should should change the save property', () => {
    let state = { Lewis: { gifts: 1 } };
    state = reducer(state, {
      char: 'Lewis',
      count: 2,
      type: types.SET_GIFT_COUNT
    });
    expect(state).toEqual({ Lewis: { gifts: 2 } });
  });

  it('should add the selected gift to the character', () => {
    let state = { Lewis: {} };
    state = reducer(state, {
      char: 'Lewis',
      gift: 208,
      type: types.SELECT_GIFT
    });
    expect(state.Lewis.selected.length).toEqual(1);
    expect(state).toEqual({ Lewis: { selected: [208] } });
  });

  it('should not add more than 2 gits', () => {
    let state = { Lewis: { selected: [208, 200] } };
    state = reducer(state, {
      char: 'Lewis',
      gift: 208,
      type: types.SELECT_GIFT
    });
    expect(state.Lewis.selected.length).toEqual(2);
    expect(state).toEqual({ Lewis: { selected: [200, 208] } });
  });

  it('should deselect the chosen gift', () => {
    let state = { Lewis: { selected: [208, 200] } };
    state = reducer(state, {
      char: 'Lewis',
      gift: 208,
      type: types.DESELECT_GIFT
    });
    expect(state.Lewis.selected.length).toEqual(1);
    expect(state).toEqual({ Lewis: { selected: [200] } });
  });

  it('should deselect only chosen gifts', () => {
    let state = { Lewis: { selected: [208, 200] } };
    state = reducer(state, {
      char: 'Lewis',
      gift: 408,
      type: types.DESELECT_GIFT
    });
    expect(state).toEqual({ Lewis: { selected: [208, 200] } });
    expect(state.Lewis.selected.length).toEqual(2);
  });

  it('should not fail to deselect on no chosen gifts', () => {
    let state = {};
    state = reducer(state, {
      char: 'Lewis',
      gift: 408,
      type: types.DESELECT_GIFT
    });
    expect(state).toEqual({ Lewis: { selected: [] } });
    expect(state.Lewis.selected.length).toEqual(0);
  });

  it('should not add more than 2 gits', () => {
    let state = { Lewis: { selected: [208, 200] } };
    state = reducer(state, {
      char: 'Lewis',
      gift: 208,
      type: types.DESELECT_GIFT
    });
    expect(state.Lewis.selected.length).toEqual(1);
    expect(state).toEqual({ Lewis: { selected: [200] } });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState.characters);
  });
});
