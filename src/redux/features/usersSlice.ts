import { createSlice } from '@reduxjs/toolkit';
import { UserAssignedWorkplace } from '../../utils/types';
import { Role } from '../../utils/constants';

interface UsersState {
  value: { users: UserAssignedWorkplace[]; activeUser: UserAssignedWorkplace };
}

const initialState: UsersState = {
  value: {
    users: [],
    activeUser: {
      id: '',
      user: {
        email: '',
        name: '',
        id: '',
        avatar_url: ''
      },
      role: Role.GUEST
    }
  }
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.value.users = action.payload;
    }
  }
});

export const usersActions = usersSlice.actions;

export default usersSlice.reducer;
