export interface comment {
  id: number,
  text: string,
  published_at: string,
  likes: number,
  comments_count: number,
  answers: answer[],
  isShowedAnswers: boolean,
  isLiked: boolean,
  user: {
    username: string,
    avatar: string
  }
}

export interface answer {
  id: number,
  text: string,
  published_at: string,
  likes: number,
  answer_to: number,
  isLiked: boolean,
  user: {
    username: string,
    avatar: string
  }
}
