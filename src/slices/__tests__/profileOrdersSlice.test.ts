import { profileOrdersSlice, fetchUserOrders } from '../profileOrdersSlice';
import { TOrder } from '@utils-types';

describe('profileOrdersSlice', () => {
  const initialState = {
    orders: { orders: [], total: 0, totalToday: 0 },
    loading: false,
    error: null,
    loaded: false
  };

  it('should return the initial state', () => {
    expect(profileOrdersSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchUserOrders.pending', () => {
    const state = profileOrdersSlice.reducer(initialState, {
      type: fetchUserOrders.pending.type
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchUserOrders.fulfilled', () => {
    const orders = {
      orders: [
        {
          _id: '1',
          ingredients: ['1', '2'],
          status: 'done',
          name: 'Бургер 1',
          createdAt: '2023-01-01T00:00:00.000Z',
          updatedAt: '2023-01-01T00:00:00.000Z',
          number: 1
        }
      ],
      total: 100,
      totalToday: 10
    };
    const action = {
      type: fetchUserOrders.fulfilled.type,
      payload: orders
    };
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state.orders).toEqual(orders);
    expect(state.loaded).toBe(true);
  });

  it('should handle fetchUserOrders.rejected', () => {
    const error = 'Ошибка';
    const action = {
      type: fetchUserOrders.rejected.type,
      error: { message: error }
    };
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});