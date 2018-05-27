import { getType } from 'typesafe-actions';
import { NavigationActions } from '../../common/types';
import * as actions from '../navigationActions';

describe('navigationActions', () => {
  it('should create an action to toggle the sidebar', () => {
    const actionType = getType(actions.toggleSidebar);
    const expectedAction: NavigationActions = {
      type: actionType
    };
    expect(actions.toggleSidebar()).toEqual(expectedAction);
  });
});
