import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: "",
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInSuccess: (state, action) => {
      state._id = action.payload._id;
      state.username = action.payload.username;
    },
    signOutSuccess: (state) => {
      state._id = "";
      state.username = "";
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInSuccess, signOutSuccess } = userSlice.actions;

export default userSlice.reducer;
