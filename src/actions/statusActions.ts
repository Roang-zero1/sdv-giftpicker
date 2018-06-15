import { createStandardAction } from 'typesafe-actions';

export const setSaveGame = createStandardAction('status/SET_SAVE_GAME')<
  boolean
>();

export const setIntroChosen = createStandardAction('status/SET_INTRO_CHOSEN')<
  boolean
>();

export const setLoading = createStandardAction('status/SET_LOADING')<boolean>();
