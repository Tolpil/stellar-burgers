import { profileOrdersSlice, initialState } from '../profileOrdersSlice';

describe('profileOrdersSlice', () => {
  it('should return the initial state', () => {
    expect(profileOrdersSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setProfileOrders', () => {
    const orders = [
      {
        _id: '1',
        ingredients: ['1', '2'],
        status: 'done',
        name: 'Бургер 1',
        createdAt: '2023-01-01T00:00:00.000Z',
        updatedAt: '2023-01-01T00:00:00.000Z',
        number: 1
      }
    ];
    const action = { type: profileOrdersSlice.actions.setProfileOrders.type, payload: orders };
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state.orders).toEqual(orders);
  });
});