import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  userName: string;
  logged: boolean;
}

const initialState: UserState = {
  userName: '',
  logged: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInUser: (state, action: PayloadAction<string>) => {
      state.userName = action.payload;
      state.logged = true;
    },
    logoutUser: (state) => {
      state.userName = '';
      state.logged = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
