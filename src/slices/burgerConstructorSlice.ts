import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../utils/types';

interface BurgerConstructorState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  orderRequest: boolean;
  orderModalData: any | null;
}

const initialState: BurgerConstructorState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },
  orderRequest: false,
  orderModalData: null
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<TConstructorIngredient>) => {
      if (action.payload.type === 'bun') {
        state.constructorItems.bun = action.payload;
      } else {
        state.constructorItems.ingredients.push(action.payload);
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.constructorItems.ingredients = state.constructorItems.ingredients.filter(
        (ingredient) => ingredient.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = [...state.constructorItems.ingredients];
      const [movedItem] = ingredients.splice(fromIndex, 1);
      ingredients.splice(toIndex, 0, movedItem);
      state.constructorItems.ingredients = ingredients;
    },
    clearConstructor: (state) => {
      state.constructorItems = initialState.constructorItems;
    },
    setOrderRequest: (state, action: PayloadAction<boolean>) => {
      state.orderRequest = action.payload;
    },
    setOrderModalData: (state, action: PayloadAction<any | null>) => {
      state.orderModalData = action.payload;
    }
  }
});

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor,
  setOrderRequest,
  setOrderModalData
} = burgerConstructorSlice.actions;

export default burgerConstructorSlice.reducer;