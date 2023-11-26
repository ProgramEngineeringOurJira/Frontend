import { createSlice } from '@reduxjs/toolkit';
import { Sprint } from '../../utils/types';

interface CurrentSprintState {
  value: Sprint;
}

const initialState: CurrentSprintState = {
  value: {
    name: '',
    start_date: '',
    end_date: '',
    id: '',
    columns: []
  }
};

export const currentSprintSlice = createSlice({
  name: 'currSprint',
  initialState,
  reducers: {
    setSprint: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const currSprintActions = currentSprintSlice.actions;

export default currentSprintSlice.reducer;
