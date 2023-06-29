import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  email: string;
  logged: boolean;
  accessToken: string;
}

const initialState: UserState = {
  email: '',
  logged: false,
  accessToken: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signInUser: (
      state,
      action: PayloadAction<{ email: string; accessToken: string }>
    ) => {
      state.email = action.payload.email;
      state.logged = true;
      state.accessToken = action.payload.accessToken;
    },
    logoutUser: (state) => {
      state.email = '';
      state.accessToken = '';
      state.logged = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;
