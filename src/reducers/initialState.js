import { initialState as initialNavigationState } from './navigationReducer';
import { initialState as initialItemsState } from './itemsReducer';
import { initialState as initialStatusState } from './statusReducer';
import { initialState as initialCharactersState } from './charactersReducer';

export default {
  characters: initialCharactersState,
  items: initialItemsState,
  navigation: initialNavigationState,
  status: initialStatusState
};
