import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { user } from "types/auth";

const initialState: user = {
  id: 0,
  username: "",
  name: "",
  email: "",
  about: "",
  avatar: "",
  followers: 0,
  likes: 0,
  posts_count: 0,
  website: "",
  subscribe: false,
}

export const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<user>) {
      return action.payload;
    },
    clearUser() {
      return initialState;
    },
    setSubscribe(state, action: PayloadAction<boolean>) {
      if (action.payload) {
        state.subscribe = true;
        state.followers++;
      } else {
        state.subscribe = false;
        state.followers--;
      }
    }
  }
});

export default userReducer.reducer;
