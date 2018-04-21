import * as types from './actionTypes';

export function setLoaded(loaded = false) {
  return { type: types.SET_LOADED, loaded: loaded };
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

export function toggleSidebar() {
  return { type: types.TOGGLE_SIDEBAR };
}
