import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  loginUserApi,
  registerUserApi,
  forgotPasswordApi,
  resetPasswordApi,
  getUserApi,
  updateUserApi,
  logoutApi
} from '../utils/burger-api';
import { TUser } from '../utils/types';

interface UserState {
  user: TUser | null;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  loading: false,
  error: null
};

export const registerUser = createAsyncThunk(
  'user/registerUser',
  async (data: { email: string; name: string; password: string }) => {
    const response = await registerUserApi(data);
    return response.user;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (data: { email: string; password: string }) => {
    const response = await loginUserApi(data);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
);

export const fetchUser = createAsyncThunk('user/fetchUser', async () => {
  const response = await getUserApi();
  return response.user;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TUser>) => {
    const response = await updateUserApi(user);
    return response.user;
  }
);

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to register user';
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to login';
      })
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(fetchUser.rejected, (state) => {
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update user';
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthChecked = false;
      });
  }
});

export const { setAuthChecked } = userSlice.actions;

export default userSlice.reducer;