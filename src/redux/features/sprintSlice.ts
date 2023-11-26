import { createSlice } from '@reduxjs/toolkit';
import { Sprint } from '../../utils/types';

interface SprintState {
  value: Sprint[];
}

const initialState: SprintState = {
  value: []
};

export const sprintSlice = createSlice({
  name: 'sprint',
  initialState,
  reducers: {
    setSprints: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const sprintsActions = sprintSlice.actions;

export default sprintSlice.reducer;
