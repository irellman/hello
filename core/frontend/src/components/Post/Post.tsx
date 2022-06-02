import React, {FC, useState} from "react";
import {answer, comment} from "types/post";
import styles from "./Post.module.scss";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import axios from "axios";
import {postsReducer} from "../../context/postsReducer/reducer";

const Comments = React.lazy(() => import("./Comments"));
const Carousel = React.lazy(() => import("./Carousel"));
const PostHeader = React.lazy(() => import("./PostHeader"));
const PostActions = React.lazy(() => import("./PostActions"));
const CommentInput = React.lazy(() => import("./CommentInput"));
const PostDescription = React.lazy(() => import("./PostDescription"));

interface props {
  id: number,
  withComments: boolean
}

interface answerTo {
  id: number,
  username: string
}

const Post: FC<props> = ({ id, withComments }) => {
  const post = useAppSelector(state => state.currentPostReducer);
  const [answerTo, setAnswerTo] = useState<answerTo>({id: 0, username: ""});

  const dispatch = useAppDispatch();
  const postsReducerActions = postsReducer.actions;

  const Like = async (id: number) => {
    if (post!.isLiked) {
      dispatch(postsReducerActions.dislikePost(id));
      await axios.post(`http://127.0.0.1:8000/api/post/${id}/dislike`);
    } else {
      dispatch(postsReducerActions.likePost(id));
      await axios.post(`http://127.0.0.1:8000/api/post/${id}/like`);
    }
  }

  const comments = (comments: comment[]) => {
    dispatch(postsReducerActions.addComment({id: post.id, comments: comments}));
  }

  const answer = (answers: answer[]) => {
    console.log("hello")
  }

  return (
    post ?
      <div className={styles.container}>
        <PostHeader post={post} />
        <Carousel images={post.images} />
        <PostActions
          post={post}
          onLike={Like}
          withComments={withComments}
        />
        <PostDescription rawDescription={post.description} />
        <div className={styles.comments}>
          {withComments &&
            <Comments
              post={post}
              setComments={comments}
              setAnswerTo={setAnswerTo}
            />
          }
          <CommentInput
            answerTo={answerTo}
            setAnswerTo={setAnswerTo}
          />
        </div>
      </div>
    :
      <></>
  );
}

export default Post;
