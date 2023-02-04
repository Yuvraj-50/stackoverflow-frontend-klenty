import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: {},
  },

  reducers: {
    getUser(state, action) {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    removeUser(state, action) {
      state.isAuthenticated = false;
      state.user = {};
    },
  },
});

export default userSlice.reducer;
export const { getUser, removeUser } = userSlice.actions;
