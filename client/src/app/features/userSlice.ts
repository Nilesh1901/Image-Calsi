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
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { signInSuccess } = userSlice.actions;

export default userSlice.reducer;
