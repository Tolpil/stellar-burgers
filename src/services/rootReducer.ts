import { combineReducers } from '@reduxjs/toolkit';
import { burgerConstructorReducer } from '../slices/burgerConstructorSlice';
import { feedReducer } from '../slices/feedSlice';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { authReducer } from '../slices/authSlice';
import { profileOrdersReducer } from '../slices/profileOrdersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  auth: authReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer
});

export type RootState = ReturnType<typeof rootReducer>;
