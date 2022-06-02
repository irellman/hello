import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getCurrentDate from 'helpers/getCurrentDate';
import { comment } from "types/comment";
import { answer, post } from "types/post";
import {
  addAnswerPayload,
  addCommentPayload,
  createAnswerPayload,
  createCommentPayload,
  getAnswerPayload,
  getCommentPayload
} from "../postsReducer/types";

const initialState: post = {
  comments: [],
  commentsCount: 0,
  description: "",
  id: 0,
  images: [],
  isLiked: false,
  isSaved: false,
  likes: 0,
  published_at: "",
  publisher: {
    username: "",
    avatar: "",
    subscribe: false
  },
  tags: ""
};

export const currentPostReducer = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPost(state: post, action: PayloadAction<post>) {
      return action.payload;
    },
    likePost(state: post) {
      state.isLiked = true;
      state.likes++;
    },
    dislikePost(state: post) {
      state.isLiked = false;
      state.likes--;
    },
    clearPost() {
      return initialState;
    },
    addComment(state: post, action: PayloadAction<addCommentPayload>) {
      state.comments.push(...action.payload.comments)
    },
    addAnswers(state: post, action: PayloadAction<addAnswerPayload>) {
      const comment = getComment(state, action.payload);
      comment.answers.push(...action.payload.answers);
    },
    showAnswers(state: post, action: PayloadAction<getCommentPayload>) {
      const comment = getComment(state, action.payload);
      comment.isShowedAnswers = true;
    },
    likeComment(state: post, action: PayloadAction<getCommentPayload>) {
      const comment = getComment(state, action.payload);
      comment.isLiked = true;
      comment.likes++;
    },
    dislikeComment(state: post, action: PayloadAction<getCommentPayload>) {
      const comment = getComment(state, action.payload);
      comment.isLiked = false;
      comment.likes--;
    },
    likeAnswer(state: post, action: PayloadAction<getAnswerPayload>) {
      const answer = getAnswer(state, action.payload);
      answer.isLiked = true;
      answer.likes++;
    },
    dislikeAnswer(state: post, action: PayloadAction<getAnswerPayload>) {
      const answer = getAnswer(state, action.payload);
      answer.isLiked = false;
      answer.likes--;
    },
    createComment(state: post, action: PayloadAction<createCommentPayload>) {
      const commentToAdd: comment = {
        id: Date.now(),
        text: action.payload.comment,
        published_at: getCurrentDate(),
        likes: 0,
        isLiked: false,
        comments_count: 0,
        answers: [],
        isShowedAnswers: false,
        user: {
          username: action.payload.user.username,
          avatar: action.payload.user.avatar
        }
      }

      state.commentsCount++;
      state.comments.unshift(commentToAdd);
    },
    createAnswer(state: post, action: PayloadAction<createAnswerPayload>) {
      const answerToAdd: answer = {
        id: Date.now(),
        text: action.payload.comment,
        published_at: getCurrentDate(),
        answer_to: action.payload.commentId,
        likes: 0,
        isLiked: false,
        user: {
          username: action.payload.user.username,
          avatar: action.payload.user.avatar
        }
      }

      const comment = state.comments.find(item => {return item.id === action.payload.commentId})!;
      state.commentsCount++;
      comment.comments_count++;
      comment.answers.push(answerToAdd);
    }
  }
});

function getComment(state: post, payload: getCommentPayload) {
  return state.comments.find(item => {return item.id === payload.commentId})!;
}

function getAnswer(state: post, payload: getAnswerPayload) {
  const comment = getComment(state, {id: payload.id, commentId: payload.commentId});
  return comment.answers.find(item => {return item.id === payload.answerId})!;
}

export default currentPostReducer.reducer;
