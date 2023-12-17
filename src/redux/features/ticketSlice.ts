import { createSlice } from '@reduxjs/toolkit';
import { Issue } from '../../utils/types';
import { Priority, State, LabelTypes, Role } from '../../utils/constants';

interface TicketState {
  value: Issue;
}

const initialState: TicketState = {
  value: {
    name: '',
    text: '',
    priority: Priority.LOW,
    state: State.Backlog,
    id: '',
    creation_date: '',
    end_date: '',
    label: LabelTypes.backend,
    author: {
      id: '',
      role: Role.GUEST,
      user: {
        email: '',
        name: '',
        id: '',
        avatar_url: ''
      }
    },
    implementers: [],
    comments: [],
    subissues: [],
    files: []
  }
};

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTicket: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const ticketActions = ticketSlice.actions;

export default ticketSlice.reducer;
