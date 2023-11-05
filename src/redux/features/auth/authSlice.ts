import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import data from '../../../data/data_user.json';
import axios from 'axios';

import { ERROR_401, MESSAGE_401 } from '../../../utils/constants';


export const signUp = createAsyncThunk('signUp', async (userCredentials) => {
  const request = await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/v1/register`, userCredentials);
  const response = request.data;
  localStorage.setItem('user', JSON.stringify(response));
  return response;
});

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo') || '') : null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      (state.userInfo = action.payload),
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      (state.userInfo = null),
      localStorage.removeItem('userInfo');
    }
  }
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
