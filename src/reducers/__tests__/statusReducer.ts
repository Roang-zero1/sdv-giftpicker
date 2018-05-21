import {
  setIntroChosen,
  setLoading,
  setSaveGame
} from '../../actions/statusActions';
import reducer, { initialState } from '../statusReducer';

describe('statusReducer', () => {
  it('should should change the save property', () => {
    expect(reducer(initialState, setSaveGame(true))).toEqual({
      ...initialState,
      save: true
    });
  });

  it('should should change the loading property', () => {
    expect(reducer(initialState, setLoading(true))).toEqual({
      ...initialState,
      loading: true
    });
  });

  it('should should change the intro property', () => {
    expect(reducer(initialState, setIntroChosen(true))).toEqual({
      ...initialState,
      intro: true
    });
  });

  it('should return the initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
