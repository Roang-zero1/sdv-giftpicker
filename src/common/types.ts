import { StateType } from 'typesafe-actions';
import { ActionType } from 'typesafe-actions/src/types';
import * as charactersActions from '../actions/charactersActions';
import * as itemsAction from '../actions/itemsActions';
import * as navigationActions from '../actions/navigationActions';
import * as statusActions from '../actions/statusActions';
import charactersReducer from '../reducers/charactersReducer';
import itemsReducer from '../reducers/itemsReducer';
import navigationReducer from '../reducers/navigationReducer';
import rootReducer from '../reducers/rootReducer';
import statusReducer from '../reducers/statusReducer';

export interface IItems {
  [itemID: number]: number;
}

export interface IModifyItemCount {
  itemID: number;
  amount: number;
}

export interface ICharacterGiftSelect {
  char: string;
  itemID: number;
}

export interface ICharacterGiftCount {
  char: string;
  count: number;
}

export type CharactersActions = ActionType<typeof charactersActions>;
export type ItemsActions = ActionType<typeof itemsAction>;
export type NavigationActions = ActionType<typeof navigationActions>;
export type StatusActions = ActionType<typeof statusActions>;

export type CharacterState = StateType<typeof charactersReducer>;
export type ItemsState = StateType<typeof itemsReducer>;
export type NavigationState = StateType<typeof navigationReducer>;
export type StatusState = StateType<typeof statusReducer>;
export type RootState = StateType<typeof rootReducer>;
