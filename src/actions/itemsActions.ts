import { createStandardAction } from 'typesafe-actions';
import { IItems, IModifyItemCount } from '../common/types';

export const modifyItemCount = createStandardAction('items/MODIFY_COUNT')<
  IModifyItemCount
>();

export const updateItems = createStandardAction('items/UPDATE_ITEMS')<IItems>();
