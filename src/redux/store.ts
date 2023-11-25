import { configureStore } from '@reduxjs/toolkit';
import columnsSlice from './features/columns/columnsSlice';
import boardSlice from './features/boardSlice';
import sprintSlice from './features/sprintSlice';
import currentSprintSlice from './features/currentSprintSlice';

export const store = configureStore({
  reducer: {
    columns: columnsSlice.reducer,
    board: boardSlice,
    sprint: sprintSlice,
    currSprint: currentSprintSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
