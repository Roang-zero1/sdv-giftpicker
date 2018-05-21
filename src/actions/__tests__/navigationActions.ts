import { NavigationActions } from '../../common/types';
import ActionTypes from '../actionTypesTS';
import * as actions from '../navigationActions';

describe('navigationActions', () => {
  it('should create an action to toggle the sidebar', () => {
    const expectedAction: NavigationActions = {
      type: ActionTypes.TOGGLE_SIDEBAR
    };
    expect(actions.toggleSidebar()).toEqual(expectedAction);
  });
});
