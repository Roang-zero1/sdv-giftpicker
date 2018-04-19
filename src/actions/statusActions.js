import * as types from './actionTypes';

export function setLoaded() {
  return { type: types.SET_LOADED };
}

export function setProgress(value, label = '', active = true) {
  return {
    type: types.SET_PROGRESS,
    progress: { value: value, label: label, active: active }
  };
}
