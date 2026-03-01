import { ingredientsSlice, fetchIngredients } from '../ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('ingredientsSlice', () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null
  };

  const mockIngredients: TIngredient[] = [
    {
      _id: '1',
      name: 'Булка 1',
      type: 'bun',
      proteins: 10,
      fat: 20,
      carbohydrates: 30,
      calories: 100,
      price: 50,
      image: 'image1.jpg',
      image_mobile: 'image1_mobile.jpg',
      image_large: 'image1_large.jpg'
    },
    {
      _id: '2',
      name: 'Начинка 1',
      type: 'main',
      proteins: 15,
      fat: 25,
      carbohydrates: 35,
      calories: 150,
      price: 75,
      image: 'image2.jpg',
      image_mobile: 'image2_mobile.jpg',
      image_large: 'image2_large.jpg'
    }
  ];

  it('should return the initial state', () => {
    expect(ingredientsSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle fetchIngredients.pending', () => {
    const state = ingredientsSlice.reducer(initialState, {
      type: fetchIngredients.pending.type
    });
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle fetchIngredients.fulfilled', () => {
    const state = ingredientsSlice.reducer(
      initialState,
      {
        type: fetchIngredients.fulfilled.type,
        payload: mockIngredients
      }
    );
    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(mockIngredients);
  });

  it('should handle fetchIngredients.rejected', () => {
    const error = 'Failed to fetch ingredients';
    const state = ingredientsSlice.reducer(
      initialState,
      {
        type: fetchIngredients.rejected.type,
        error: { message: error }
      }
    );
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });
});