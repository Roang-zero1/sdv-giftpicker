import { createStandardAction } from 'typesafe-actions';

export const toggleSidebar = createStandardAction(
  'navigation/TOGGLE_SIDEBAR'
)();
