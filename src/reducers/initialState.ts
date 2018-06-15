import { initialState as initialCharactersState } from './charactersReducer';
import { initialState as initialItemsState } from './itemsReducer';
import { initialState as initialNavigationState } from './navigationReducer';
import { initialState as initialStatusState } from './statusReducer';

export default {
  characters: initialCharactersState,
  items: initialItemsState,
  navigation: initialNavigationState,
  status: initialStatusState
};
