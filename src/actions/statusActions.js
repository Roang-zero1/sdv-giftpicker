import * as types from './actionTypes';

export function setSaveGame(save = false) {
  return { type: types.SET_SAVE_GAME, save: save };
}

export function setIntroChosen(intro = false) {
  return { type: types.SET_INTRO_CHOSEN, intro: intro };
}

export function setLoading(loading = false) {
  return {
    type: types.SET_LOADING,
    loading: loading
  };
}

export function setFluidLayout(fluid = false) {
  return { type: types.SET_FLUID_LAYOUT, fluid };
}
