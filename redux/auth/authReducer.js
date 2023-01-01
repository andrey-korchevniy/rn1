import { createSlice } from '@reduxjs/toolkit';

//* start state
const iniState = {
  userId: null,
  nickname: null,
  stateChange: false,
};

//* actions
const actions = {
  updateUserProfile: (state, { payload }) => ({
    ...state,
    userId: payload.userId,
    nickname: payload.nickname,
  }),
  authStateChange: (state, { payload }) => ({
    ...state,
    stateChange: payload.stateChange,
  }),
  authSignOut: () => iniState,
};

//* slice
export const authSlice = createSlice({
  name: 'auth',
  initialState: iniState,
  reducers: actions,
});
