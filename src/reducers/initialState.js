import { initialState as initialNavigationState } from './navigationReducer';
import { initialState as initialItemsState } from './itemsReducer';

export default {
  characters: {},
  items: initialItemsState,
  navigation: initialNavigationState,
  status: { intro: false, save: false }
};
