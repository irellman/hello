import {Dispatch} from "@reduxjs/toolkit";
import axios from "axios";
import {userReducer} from "./reducer";

export const getUserByUsername = (username: string) => {
  return async (dispatch: Dispatch) => {
    const { setUser } = userReducer.actions;
    const res = await axios.post(`http://127.0.0.1:8000/user/${username}`);
    const data = res.data;
    dispatch(setUser(data));
  }
}

export const subscribe = (username: string) => {
  return async (dispatch: Dispatch) => {
    const { setSubscribe } = userReducer.actions;
    dispatch(setSubscribe(true));

    const formData = new FormData();
    formData.append("username", username);
    await axios.post("http://127.0.0.1:8000/user/subscribe", formData)
  }
}

export const unsubscribe = (username: string) => {
  return async (dispatch: Dispatch) => {
    const { setSubscribe } = userReducer.actions;
    dispatch(setSubscribe(false));

    const formData = new FormData();
    formData.append("username", username);
    await axios.post("http://127.0.0.1:8000/user/unsubscribe", formData)
  }
}
