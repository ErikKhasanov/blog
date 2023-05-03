/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Axios from '../../api/axios';

export const getUserData = createAsyncThunk('auth/getUserData', async (params) => {
  const { data } = await Axios.post('/auth/login', params);
  return data;
});

export const getUserDataMe = createAsyncThunk('auth/getUserData', async (params) => {
  const { data } = await Axios.get('/auth/me', params);
  return data;
});

export const registration = createAsyncThunk('register', async (params) => {
  const { data } = await Axios.post('/registration', params);
  return data;
});

const initialState = {
  data: null,
  status: 'loading',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
      window.localStorage.removeItem('token');
    },
  },
  extraReducers: {
    [getUserData.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [getUserData.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [getUserData.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [getUserDataMe.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [getUserDataMe.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [getUserDataMe.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
    [registration.pending]: (state) => {
      state.status = 'loading';
      state.data = null;
    },
    [registration.fulfilled]: (state, action) => {
      state.status = 'loaded';
      state.data = action.payload;
    },
    [registration.rejected]: (state) => {
      state.status = 'error';
      state.data = null;
    },
  },
});

export const selectIsAuth = (state) => Boolean(state.auth.data);
export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
