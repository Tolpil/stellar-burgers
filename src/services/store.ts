import { configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsReducer from '../slices/ingredientsSlice';
import burgerConstructorReducer from '../slices/burgerConstructorSlice';
import userReducer from '../slices/userSlice';
import feedReducer from '../slices/feedSlice';

const rootReducer = {
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  user: userReducer,
  feed: feedReducer
};

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
