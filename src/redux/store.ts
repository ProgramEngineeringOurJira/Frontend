import { configureStore } from '@reduxjs/toolkit';
import columnsSlice from './features/columns/columnsSlice';
import boardSlice from './features/boardSlice';
import sprintSlice from './features/sprintSlice';

export const store = configureStore({
  reducer: {
    columns: columnsSlice.reducer,
    board: boardSlice,
    sprint: sprintSlice
  }
});
