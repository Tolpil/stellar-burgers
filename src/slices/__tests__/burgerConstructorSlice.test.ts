import { burgerConstructorSlice } from '../burgerConstructorSlice';
import { TConstructorState } from '@utils-types';

describe('burgerConstructorSlice', () => {
  const initialState: TConstructorState = {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    orderRequest: false,
    orderModalData: null
  };

  const mockIngredient = {
    id: '1',
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
  };

  const mockState: TConstructorState = {
    constructorItems: {
      bun: mockIngredient,
      ingredients: [mockIngredient]
    },
    orderRequest: false,
    orderModalData: null
  };

  it('should return the initial state', () => {
    expect(burgerConstructorSlice.reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('should handle addIngredient for bun', () => {
    const action = {
      type: burgerConstructorSlice.actions.addIngredient.type,
      payload: { ingredient: mockIngredient }
    };
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state.constructorItems.bun).toEqual(mockIngredient);
  });

  it('should handle addIngredient for ingredient', () => {
    const ingredient = { ...mockIngredient, type: 'main', id: '2' };
    const action = {
      type: burgerConstructorSlice.actions.addIngredient.type,
      payload: { ingredient }
    };
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state.constructorItems.ingredients).toContainEqual(ingredient);
  });

  it('should handle removeIngredient', () => {
    const action = {
      type: burgerConstructorSlice.actions.removeIngredient.type,
      payload: { id: '1' }
    };
    const state = burgerConstructorSlice.reducer(mockState, action);
    expect(state.constructorItems.ingredients).toHaveLength(0);
  });

  it('should handle resetConstructor', () => {
    const action = {
      type: burgerConstructorSlice.actions.resetConstructor.type
    };
    const state = burgerConstructorSlice.reducer(mockState, action);
    expect(state.constructorItems.bun).toBeNull();
    expect(state.constructorItems.ingredients).toHaveLength(0);
    expect(state.orderModalData).toBeNull();
  });
});