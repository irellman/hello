import {answer, comment} from "types/post";

export interface addCommentPayload {
  id: number,
  comments: comment[]
}

export interface addAnswerPayload {
  id: number,
  commentId: number,
  answers: answer[]
}

export interface getCommentPayload {
  id: number,
  commentId: number
}

export interface getAnswerPayload {
  id: number,
  commentId: number,
  answerId: number
}

export interface createCommentPayload {
  id: number,
  comment: string,
  user: {
    username: string,
    avatar: string
  }
}

export interface createAnswerPayload {
  id: number,
  commentId: number,
  comment: string,
  user: {
    username: string,
    avatar: string
  }
}
