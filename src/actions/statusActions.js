import * as types from './actionTypes';

export function setLoaded(loaded = true) {
  return { type: types.SET_LOADED, loaded: loaded };
}

export function setProgress(value, label = '', active = true) {
  return {
    type: types.SET_PROGRESS,
    progress: { value: value, label: label, active: active }
  };
}
