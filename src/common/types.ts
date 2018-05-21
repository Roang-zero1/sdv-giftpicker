import { ActionType } from 'typesafe-actions/src/types';
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

export type ItemsActions = ActionType<typeof itemsAction>;

export type NavigationActions = ActionType<typeof navigationActions>;

export type StatusActions = ActionType<typeof statusActions>;
