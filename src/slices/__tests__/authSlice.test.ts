import { authSlice, initialState } from '../authSlice';

describe('authSlice', () => {
  it('should return the initial state', () => {
    expect(authSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setUser', () => {
    const user = {
      name: 'Test User',
      email: 'test@example.com'
    };
    const action = { type: authSlice.actions.setUser.type, payload: user };
    const state = authSlice.reducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isAuthChecked).toBe(true);
  });

  it('should handle logout', () => {
    const action = { type: authSlice.actions.logout.type };
    const state = authSlice.reducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(false);
  });
});