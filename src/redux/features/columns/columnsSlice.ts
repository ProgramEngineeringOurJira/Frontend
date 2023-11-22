import { createSlice } from '@reduxjs/toolkit';
import data from '../../../data/data.json';

const columnsSlice = createSlice({
  name: 'columns',
  initialState: data.columns,
  reducers: {
    addTask: (state, action) => {
      const { id, title, status, description, newColIndex, date, priority, label } = action.payload;
      const task = { id, title, description, status, date, priority , label};
      const column = state.find((col, index) => index === newColIndex);
      if (typeof column !== 'undefined') column.tasks.push(task);
    }
  }
});

export default columnsSlice;
