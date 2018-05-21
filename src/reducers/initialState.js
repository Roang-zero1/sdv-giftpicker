import { initialState as initialNavigationState } from './navigationReducer';
import { initialState as initialItemsState } from './itemsReducer';
import { initialState as initialStatusState } from './statusReducer';

export default {
  characters: {},
  items: initialItemsState,
  navigation: initialNavigationState,
  status: initialStatusState
};
