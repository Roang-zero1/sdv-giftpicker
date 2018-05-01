import navigation from '../navigationReducer';
import * as types from '../../actions/actionTypes';

describe('navigationReducer', () => {
  it('should should toggle the sidebar display', () => {
    let state = { sidebar: true };
    state = navigation(state, { type: types.TOGGLE_SIDEBAR });
    expect(state).toEqual({ sidebar: false });
  });

  it('should keep the state steady', () => {
    let state = { sidebar: true };
    state = navigation(state, { type: 'NONE' });
    expect(state).toEqual({ sidebar: true });
  });
});
