import { createSlice } from '@reduxjs/toolkit';
import { UserAssignedWorkplace } from '../../utils/types';

interface UsersState {
  value: UserAssignedWorkplace[];
  activeUser?: UserAssignedWorkplace;
}

const initialState: UsersState = {
  value: [],
  activeUser: undefined
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
