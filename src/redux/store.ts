import { configureStore } from '@reduxjs/toolkit';
import columnsSlice from './features/columns/columnsSlice';
import boardSlice from './features/boardSlice';

export const store = configureStore({
  reducer: {
    columns: columnsSlice.reducer,
    board: boardSlice
  }
});
