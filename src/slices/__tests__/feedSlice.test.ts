import { feedSlice, fetchFeed } from '../feedSlice';
import { TOrdersData } from '@utils-types';

describe('feedSlice', () => {
  const initialState = {
    orders: [],
    total: 0,
    totalToday: 0,
    isLoading: false,
    error: null,
    loaded: false
  };

  it('should return the initial state', () => {
    expect(feedSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchFeed.pending', () => {
    const state = feedSlice.reducer(initialState, {
      type: fetchFeed.pending.type
    });
    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchFeed.fulfilled', () => {
    const feed: TOrdersData = {
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
      type: fetchFeed.fulfilled.type,
      payload: feed
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.orders).toEqual(feed.orders);
    expect(state.total).toBe(feed.total);
    expect(state.totalToday).toBe(feed.totalToday);
    expect(state.loaded).toBe(true);
  });

  it('should handle fetchFeed.rejected', () => {
    const error = 'Ошибка загрузки ленты';
    const action = {
      type: fetchFeed.rejected.type,
      error: { message: error }
    };
    const state = feedSlice.reducer(initialState, action);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(error);
  });
});