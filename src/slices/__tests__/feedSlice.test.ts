import { feedSlice, initialState } from '../feedSlice';

describe('feedSlice', () => {
  it('should return the initial state', () => {
    expect(feedSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle setFeed', () => {
    const feed = {
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
    const action = { type: feedSlice.actions.setFeed.type, payload: feed };
    const state = feedSlice.reducer(initialState, action);
    expect(state.orders).toEqual(feed.orders);
    expect(state.total).toBe(feed.total);
    expect(state.totalToday).toBe(feed.totalToday);
  });
});