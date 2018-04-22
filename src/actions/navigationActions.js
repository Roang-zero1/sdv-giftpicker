import * as types from './actionTypes';

export function selectCharacter(char) {
  return { type: types.SELECT_CHARACTER, char: char };
}

export function selectOverview() {
  return { type: types.SELECT_OVERVIEW };
}

export function toggleSidebar() {
  return { type: types.TOGGLE_SIDEBAR };
}
