import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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

export const { setSprints } = sprintSlice.actions;

export default sprintSlice.reducer;
