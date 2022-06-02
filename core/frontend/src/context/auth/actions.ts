import {Dispatch} from "@reduxjs/toolkit";
import {authReducer} from "./reducer";
import axios from "axios";

export const logout = () => {
  return async (dispatch: Dispatch) => {
    const { clearAuthUser } = authReducer.actions;
    dispatch(clearAuthUser());

    await axios.post("http://127.0.0.1:8080/auth/logout");
  }
}
