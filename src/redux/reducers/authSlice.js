import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    auth: Cookies.get('auth') ? JSON.parse(Cookies.get('auth')) : null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.auth = action.payload;
    },
    logout: (state) => {
      state.auth = null;
    },
  },
});

export const { setAuth, logout } = authSlice.actions;
