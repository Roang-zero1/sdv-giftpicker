import { ActionType } from 'typesafe-actions/src/types';
import * as itemsAction from '../actions/itemsActions';
import * as navigationActions from '../actions/navigationActions';

export interface IItems {
  [itemID: number]: number;
}

export interface IModifyItemCount {
  itemID: number;
  amount: number;
}

export type ItemsActions = ActionType<typeof itemsAction>;

export type NavigationActions = ActionType<typeof navigationActions>;
