import characters from '../charactersReducer';
import * as types from '../../actions/actionTypes';

describe('statusReducer', () => {
  it('should should change the save property', () => {
    let state = { Lewis: { gifts: 1 } };
    state = characters(state, {
      type: types.SET_GIFT_COUNT,
      char: 'Lewis',
      count: 2
    });
    expect(state).toEqual({ Lewis: { gifts: 2 } });
  });

  it('should add the selected gift to the character', () => {
    let state = { Lewis: {} };
    state = characters(state, {
      type: types.SELECT_GIFT,
      char: 'Lewis',
      gift: 208
    });
    expect(state.Lewis.selected.length).toEqual(1);
    expect(state).toEqual({ Lewis: { selected: [208] } });
  });

  it('should not add more than 2 gits', () => {
    let state = { Lewis: { selected: [208, 200] } };
    state = characters(state, {
      type: types.SELECT_GIFT,
      char: 'Lewis',
      gift: 208
    });
    expect(state.Lewis.selected.length).toEqual(2);
    expect(state).toEqual({ Lewis: { selected: [200, 208] } });
  });

  it('should deselect the chosen gift', () => {
    let state = { Lewis: { selected: [208, 200] } };
    state = characters(state, {
      type: types.DESELECT_GIFT,
      char: 'Lewis',
      gift: 208
    });
    expect(state.Lewis.selected.length).toEqual(1);
    expect(state).toEqual({ Lewis: { selected: [200] } });
  });

  it('should deselect only chosen gifts', () => {
    let state = { Lewis: { selected: [208, 200] } };
    state = characters(state, {
      type: types.DESELECT_GIFT,
      char: 'Lewis',
      gift: 408
    });
    expect(state).toEqual({ Lewis: { selected: [208, 200] } });
    expect(state.Lewis.selected.length).toEqual(2);
  });

  it('should not fail to deselect on no chosen gifts', () => {
    let state = {};
    state = characters(state, {
      type: types.DESELECT_GIFT,
      char: 'Lewis',
      gift: 408
    });
    expect(state).toEqual({ Lewis: { selected: [] } });
    expect(state.Lewis.selected.length).toEqual(0);
  });

  it('should not add more than 2 gits', () => {
    let state = { Lewis: { selected: [208, 200] } };
    state = characters(state, {
      type: types.DESELECT_GIFT,
      char: 'Lewis',
      gift: 208
    });
    expect(state.Lewis.selected.length).toEqual(1);
    expect(state).toEqual({ Lewis: { selected: [200] } });
  });

  it('should keep the state steady', () => {
    let state = { lewis: { gifts: 2, selected: [208] } };
    state = characters(state, { type: 'NONE' });
    expect(state).toEqual({ lewis: { gifts: 2, selected: [208] } });
  });
});
