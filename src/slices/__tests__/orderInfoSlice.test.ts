import { orderInfoSlice, initialState } from '../orderInfoSlice';

describe('orderInfoSlice', () => {
  it('should return the initial state', () => {
    expect(orderInfoSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setOrderInfo', () => {
    const order = {
      _id: '1',
      ingredients: ['1', '2'],
      status: 'done',
      name: 'Бургер 1',
      createdAt: '2023-01-01T00:00:00.000Z',
      updatedAt: '2023-01-01T00:00:00.000Z',
      number: 1
    };
    const action = { type: orderInfoSlice.actions.setOrderInfo.type, payload: order };
    const state = orderInfoSlice.reducer(initialState, action);
    expect(state.order).toEqual(order);
  });

  it('should handle resetOrderInfo', () => {
    const action = { type: orderInfoSlice.actions.resetOrderInfo.type };
    const state = orderInfoSlice.reducer(initialState, action);
    expect(state.order).toBeNull();
  });
});