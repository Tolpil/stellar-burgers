import { authSlice, initialState } from '../authSlice';

describe('authSlice', () => {
  it('should return the initial state', () => {
    expect(authSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle login.fulfilled', () => {
    const user = {
      name: 'Test User',
      email: 'test@example.com'
    };
    const action = {
      type: authSlice.actions.login.fulfilled.type,
      payload: user
    };
    const state = authSlice.reducer(initialState, action);
    expect(state.user).toEqual(user);
    expect(state.isAuthenticated).toBe(true);
  });

  it('should handle logout.fulfilled', () => {
    const action = {
      type: authSlice.actions.logout.fulfilled.type
    };
    const state = authSlice.reducer(initialState, action);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});