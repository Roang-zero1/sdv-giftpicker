import * as actions from '../navigationActions';
import * as types from '../actionTypes';

describe('charactersActions', () => {
  it('should create an action to toggle the sidebar', () => {
    const expectedAction = {
      type: types.TOGGLE_SIDEBAR
    };
    expect(actions.toggleSidebar()).toEqual(expectedAction);
  });
});
