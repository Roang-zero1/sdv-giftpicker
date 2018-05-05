import reducer from '../navigationReducer';
import * as types from '../../actions/actionTypes';

describe('navigationReducer', () => {
  it('should should toggle the sidebar display', () => {
    let state = { sidebar: true };
    state = reducer(state, { type: types.TOGGLE_SIDEBAR });
    expect(state).toEqual({ sidebar: false });
  });

  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({});
  });
});
