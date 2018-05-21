import { ActionType } from 'typesafe-actions/src/types';
import * as itemsAction from '../actions/itemsActions';

export interface IItems {
  [itemID: number]: number;
}

export interface IModifyItemCount {
  itemID: number;
  amount: number;
}

export type ItemsActions = ActionType<typeof itemsAction>;
