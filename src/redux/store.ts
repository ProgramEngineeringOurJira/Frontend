import { configureStore } from '@reduxjs/toolkit';
import boardSlice from './features/boardSlice';
import sprintSlice from './features/sprintSlice';
import currentSprintSlice from './features/currentSprintSlice';
import ticketSlice from './features/ticketSlice';
import usersSlice from './features/usersSlice';

export const store = configureStore({
  reducer: {
    board: boardSlice,
    sprint: sprintSlice,
    currSprint: currentSprintSlice,
    ticket: ticketSlice,
    users: usersSlice
  }
});

export type RootState = ReturnType<typeof store.getState>;
