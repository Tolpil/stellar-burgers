import userSlice from '../userSlice';

describe('userSlice', () => {
  const initialState = {
    user: null,
    isAuthChecked: false,
    loading: false,
    error: null
  };

  it('should return the initial state', () => {
    expect(userSlice(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle updateUser.fulfilled', () => {
    const user = {
      name: 'Updated User',
      email: 'updated@example.com'
    };
    const action = {
      type: userSlice.actions.updateUser.fulfilled.type,
      payload: user
    };
    const state = userSlice(initialState, action);
    expect(state.user).toEqual(user);
  });
});