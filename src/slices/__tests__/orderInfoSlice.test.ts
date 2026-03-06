import orderInfoSlice, { fetchOrderByNumber } from '../orderInfoSlice';

describe('orderInfoSlice', () => {
  const initialState = {
    order: null,
    loading: false,
    error: null
  };

  it('should return the initial state', () => {
    expect(orderInfoSlice(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchOrderByNumber.pending', () => {
    const state = orderInfoSlice(initialState, {
      type: fetchOrderByNumber.pending.type
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchOrderByNumber.fulfilled', () => {
    const order = {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Бургер 1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 1
    };
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: order
    };
    const state = orderInfoSlice(initialState, action);
    expect(state.order).toEqual(order);
  });

  it('should handle fetchOrderByNumber.rejected', () => {
    const error = 'Failed to fetch order';
    const action = {
      type: fetchOrderByNumber.rejected.type,
      payload: error
    };
    const state = orderInfoSlice(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});