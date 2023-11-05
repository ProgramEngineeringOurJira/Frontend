import { configureStore } from '@reduxjs/toolkit';
import columnsSlice from './features/columns/columnsSlice';
import authSlice from './features/auth/authSlice';

export const store = configureStore({
  reducer: {
    columns: columnsSlice.reducer,
  }
});
