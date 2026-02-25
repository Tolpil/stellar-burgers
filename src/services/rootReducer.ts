import { combineReducers } from '@reduxjs/toolkit';
import { burgerConstructorReducer } from '../slices/burgerConstructorSlice';
import { feedReducer } from '../slices/feedSlice';
import { ingredientsReducer } from '../slices/ingredientsSlice';
import { authReducer } from '../slices/authSlice';
import { profileOrdersReducer } from '../slices/profileOrdersSlice';
<<<<<<< HEAD
import orderInfoReducer from '../slices/orderInfoSlice';
=======
>>>>>>> e805f61991f0739a7c523c1d33d43efff505c115

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  auth: authReducer,
  feed: feedReducer,
<<<<<<< HEAD
  profileOrders: profileOrdersReducer,
  orderInfo: orderInfoReducer
=======
  profileOrders: profileOrdersReducer
>>>>>>> e805f61991f0739a7c523c1d33d43efff505c115
});

export type RootState = ReturnType<typeof rootReducer>;
