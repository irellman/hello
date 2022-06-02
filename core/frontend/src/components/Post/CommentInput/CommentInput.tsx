import { sendComment } from "api/comment";
import { postsReducer } from "context/postsReducer/reducer";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { FC, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./CommentInput.module.scss";

interface answerTo {
  id: number,
  username: string
}

interface props {
  answerTo: answerTo,
  setAnswerTo: (value: answerTo) => void
}

const CommentInput: FC<props> = ({ answerTo, setAnswerTo }) => {
  const input = useRef<any>();
  const [comment, setComment] = useState<string>("");
  const params = useParams();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector(state => state.authReducer.user)!;

  const { createAnswer, createComment } = postsReducer.actions;

  const send = async () => {
    if (answerTo.id === 0) {
      const payload = {
        id: Number(params.id),
        comment: comment,
        user: {
          username: authUser.username,
          avatar: authUser.avatar
        }
      }

      dispatch(createComment(payload));
    } else {
      const payload = {
        id: Number(params.id),
        commentId: answerTo.id,
        comment: comment,
        user: {
          username: authUser.username,
          avatar: authUser.avatar
        }
      }

      dispatch(createAnswer(payload));
    }

    setAnswerTo({id: 0, username: ""});
    setComment("");
    await sendComment(answerTo.id, Number(params.id), comment);
  }

  useEffect(() => {
    if (answerTo.id !== 0 && answerTo.username !== "") {
      setComment(`@${answerTo.username} `);
      input.current.focus();
    }
  }, [answerTo]);

  useEffect(() => {
    if (!comment.startsWith(`@${answerTo.username}`)) {
      setAnswerTo({id: 0, username: ""});
    }
  }, [comment]);

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Напишите комментарий..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        ref={input}
      />
      <div
        className={styles.send}
        onClick={() => send()}
      >
        Опубликовать
      </div>
    </div>
  );
}

export default CommentInput;
