import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { user } from "types/auth";

interface userState {
  user: user | null,
  isAuth: boolean | null
}

const initialState: userState = {
  user: JSON.parse(localStorage.getItem("user")!) || null,
  isAuth: true // JSON.parse(localStorage.getItem("user")!) || false
}

export const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser(state, action: PayloadAction<user>) {
      state.user = action.payload;
      state.isAuth = true;
    },
    logoutAuthUser(state) {
      state.user = null
      state.isAuth = false
    },
    clearAuthUser(state) {
      state.user = null
      state.isAuth = false
    },
    setAvatar(state, action: PayloadAction<string>) {
      state.user!.avatar = action.payload;
    }
  }
})

export default authReducer.reducer;
