import { combineReducers } from '@reduxjs/toolkit';
import burgerConstructorReducer from '../slices/burgerConstructorSlice';
import feedReducer from '../slices/feedSlice';
import ingredientsReducer from '../slices/ingredientsSlice';
import orderInfoReducer from '../slices/orderInfoSlice';
import userReducer from '../slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  feed: feedReducer,
  orderInfo: orderInfoReducer
});

export type RootState = ReturnType<typeof rootReducer>;
