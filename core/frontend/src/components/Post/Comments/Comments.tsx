import { LoaderIcon } from "components/icons/LoaderIcon";
import React, {FC, useEffect} from "react";
import { useParams } from "react-router-dom";
import { comment } from "types/comment";
import styles from "./Comments.module.scss";
import CommentsLogic from "./CommentsLogic";
import { post } from "types/post";

const Comment = React.lazy(() => import("./Comment"));

interface answerTo {
  id: number,
  username: string
}

interface props {
  post: post,
  setComments: (value: comment[]) => void,
  setAnswerTo: (value: answerTo) => void
}

const Comments: FC<props> = ({ post, setComments, setAnswerTo }) => {
  const {
    comments,
    container,
    hasNextPage,
    lastElement
  } = CommentsLogic(post, setComments);

  const answer = (id: number, username: string) => {
    setAnswerTo({
      id: id,
      username: username
    });
  }

  return (
    comments && comments.length ?
      <>
        <div className={styles.container} ref={container}>
          {comments.map((comment: comment, index: number) => {
            return <Comment
              comment={comment}
              onAnswer={answer}
              key={index}
            />
          })}
          {hasNextPage && comments.length > 0 &&
            <div className={styles.loader} ref={lastElement}>
              <LoaderIcon />
            </div>
          }
        </div>
      </>
    :
      <></>
  );
}

export default Comments;
