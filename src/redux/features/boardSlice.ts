import { createSlice } from '@reduxjs/toolkit';
import { Workplace } from '../../utils/types';

interface BoardState {
  value: Workplace[];
}

const initialState: BoardState = {
  value: []
};

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    setBoards: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
