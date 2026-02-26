import { combineReducers } from '@reduxjs/toolkit';
import { burgerConstructorReducer } from '../slices/burgerConstructorSlice';
import { feedReducer } from '../slices/feedSlice';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { authReducer } from '../slices/authSlice';
import { profileOrdersReducer } from '../slices/profileOrdersSlice';
import orderInfoReducer from '../slices/orderInfoSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  auth: authReducer,
  feed: feedReducer,
  profileOrders: profileOrdersReducer,
  orderInfo: orderInfoReducer
});

export type RootState = ReturnType<typeof rootReducer>;
