import {Dispatch} from "@reduxjs/toolkit";
import axios from "axios";
import { postsReducer } from "./reducer";

export const addPostById = (id: number) => {
  return async (dispatch: Dispatch) => {
    const { addPosts } = postsReducer.actions;
    const res = await axios.post(`http://127.0.0.1:8000/api/post/${id}`)
    const data = res.data;

    dispatch(addPosts(data));
  }
}

export const likeComment = (id: number, commentId: number) => {
  return async (dispatch: Dispatch) => {
    const actions = postsReducer.actions;
    dispatch(actions.likeComment({id: Number(id), commentId: commentId}));

    const formData = new FormData();
    formData.append("comment_id", String(commentId));
    return await axios.post(`http://127.0.0.1:8000/api/comment/like`, formData);
  }
}

export const dislikeComment = (id: number, commentId: number) => {
  return async (dispatch: Dispatch) => {
    const actions = postsReducer.actions;
    dispatch(actions.dislikeComment({id: Number(id), commentId: commentId}));

    const formData = new FormData();
    formData.append("comment_id", String(commentId));
    return await axios.post(`http://127.0.0.1:8000/api/comment/dislike`, formData);
  }
}

export const likeAnswer = (id: number, commentId: number, answerId: number) => {
  return async (dispatch: Dispatch) => {
    const actions = postsReducer.actions;
    dispatch(actions.likeAnswer({id: Number(id), commentId: commentId, answerId: answerId}));

    const formData = new FormData();
    formData.append("comment_id", String(commentId));
    return await axios.post(`http://127.0.0.1:8000/api/comment/like`, formData);
  }
}

export const dislikeAnswer = (id: number, commentId: number, answerId: number) => {
  return async (dispatch: Dispatch) => {
    const actions = postsReducer.actions;
    dispatch(actions.dislikeAnswer({id: Number(id), commentId: commentId, answerId: answerId}));

    const formData = new FormData();
    formData.append("comment_id", String(commentId));
    return await axios.post(`http://127.0.0.1:8000/api/comment/dislike`, formData);
  }
}