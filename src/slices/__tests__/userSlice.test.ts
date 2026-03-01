import { userSlice, initialState } from '../userSlice';

describe('userSlice', () => {
  it('should return the initial state', () => {
    expect(userSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle updateUser', () => {
    const user = {
      name: 'Updated User',
      email: 'updated@example.com',
      password: ''
    };
    const action = { type: userSlice.actions.updateUser.type, payload: user };
    const state = userSlice.reducer(initialState, action);
    expect(state.user).toEqual(user);
  });
});