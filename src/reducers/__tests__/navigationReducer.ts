import { toggleSidebar } from '../../actions/navigationActions';
import reducer, { initialState, IState } from '../navigationReducer';

describe('navigationReducer', () => {
  it('should should toggle the sidebar display', () => {
    const initialTestState: IState = { sidebar: true };
    const newState: IState = reducer(initialTestState, toggleSidebar());
    expect(newState).toEqual({ sidebar: false });
  });

  it('should return the initial state', () => {
    // @ts-ignore
    expect(reducer(undefined, {})).toEqual(initialState);
  });
});
