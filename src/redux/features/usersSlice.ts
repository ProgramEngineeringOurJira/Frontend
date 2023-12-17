import { createSlice } from '@reduxjs/toolkit';
import { UserAssignedWorkplace } from '../../utils/types';

interface UsersState {
  value: { users: UserAssignedWorkplace[]; activeUserName: string };
}

const initialState: UsersState = {
  value: {
    users: [],
    activeUserName: ''
  }
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.value = action.payload;
    }
  }
});

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
