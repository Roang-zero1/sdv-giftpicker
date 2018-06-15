import { createStandardAction } from 'typesafe-actions';
import { ICharacterGiftCount, ICharacterGiftSelect } from '../common/types';

export const setGiftCount = createStandardAction('characters/SET_GIFT_COUNT')<
  ICharacterGiftCount
>();
export const selectGift = createStandardAction('characters/SELECT_GIFT')<
  ICharacterGiftSelect
>();
export const deselectGift = createStandardAction('characters/DESELECT_GIFT')<
  ICharacterGiftSelect
>();
