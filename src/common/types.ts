import { StateType } from 'typesafe-actions';
import { ActionType } from 'typesafe-actions/src/types';
import * as charactersActions from '../actions/charactersActions';
import * as itemsAction from '../actions/itemsActions';
import * as navigationActions from '../actions/navigationActions';
import * as statusActions from '../actions/statusActions';

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
