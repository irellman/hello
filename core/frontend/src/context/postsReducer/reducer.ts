import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import getCurrentDate from 'helpers/getCurrentDate';
import { comment } from "types/comment";
import { answer, post } from "types/post";
import {
  addAnswerPayload,
  addCommentPayload, createAnswerPayload, createCommentPayload,
  getAnswerPayload,
  getCommentPayload
} from "./types";

interface postsReducerState {
  posts: post[],
  hasNextPage: boolean
}

const initialState: postsReducerState = {
  posts: [],
  hasNextPage: true
};

export const postsReducer = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPosts(state: postsReducerState, action: PayloadAction<post[]>) {
      state.posts = action.payload;
    },
    addPosts(state: postsReducerState, action: PayloadAction<post[]>) {
      state.posts.push(...action.payload);
    },
    setHasNextPage(state: postsReducerState, action: PayloadAction<boolean>) {
      state.hasNextPage = action.payload;
    },
    likePost(state: postsReducerState, action: PayloadAction<number>) {
      const post = getPost(state, action.payload)!;
      post.isLiked = true;
      post.likes++;
    },
    dislikePost(state: postsReducerState, action: PayloadAction<number>) {
      const post = getPost(state, action.payload)!;
      post.isLiked = false;
      post.likes--;
    },
    clearPosts(state: postsReducerState) {
      state.posts = [];
      state.hasNextPage = true;
    },
    addComment(state: postsReducerState, action: PayloadAction<addCommentPayload>) {
      const post = getPost(state, action.payload.id)!;
      post.comments.push(...action.payload.comments)
    },
    addAnswers(state: postsReducerState, action: PayloadAction<addAnswerPayload>) {
      const comment = getComment(state, action.payload);
      comment.answers.push(...action.payload.answers);
    },
    showAnswers(state: postsReducerState, action: PayloadAction<getCommentPayload>) {
      const comment = getComment(state, action.payload);
      comment.isShowedAnswers = true;
    },
    likeComment(state: postsReducerState, action: PayloadAction<getCommentPayload>) {
      const comment = getComment(state, action.payload);
      comment.isLiked = true;
      comment.likes++;
    },
    dislikeComment(state: postsReducerState, action: PayloadAction<getCommentPayload>) {
      const comment = getComment(state, action.payload);
      comment.isLiked = false;
      comment.likes--;
    },
    likeAnswer(state: postsReducerState, action: PayloadAction<getAnswerPayload>) {
      const answer = getAnswer(state, action.payload);
      answer.isLiked = true;
      answer.likes++;
    },
    dislikeAnswer(state: postsReducerState, action: PayloadAction<getAnswerPayload>) {
      const answer = getAnswer(state, action.payload);
      answer.isLiked = false;
      answer.likes--;
    },
    createComment(state: postsReducerState, action: PayloadAction<createCommentPayload>) {
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

      const post = getPost(state, action.payload.id)!;
      post.commentsCount++;
      post.comments.unshift(commentToAdd);
    },
    createAnswer(state: postsReducerState, action: PayloadAction<createAnswerPayload>) {
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

      const post = getPost(state, action.payload.id)!;
      const comment = post?.comments.find(item => {return item.id === action.payload.commentId})!;
      post.commentsCount++;
      comment.comments_count++;
      comment.answers.push(answerToAdd);
    }
  }
});

function getPost(state: postsReducerState, payload: number) {
  return state.posts.find(item => {return item.id === payload})!;
}

function getComment(state: postsReducerState, payload: getCommentPayload) {
  const post = getPost(state, payload.id);
  return post.comments.find(item => {return item.id === payload.commentId})!;
}

function getAnswer(state: postsReducerState, payload: getAnswerPayload) {
  const comment = getComment(state, {id: payload.id, commentId: payload.commentId});
  return comment.answers.find(item => {return item.id === payload.answerId})!;
}

export default postsReducer.reducer;
