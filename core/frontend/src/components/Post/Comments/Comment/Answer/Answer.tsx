import Like from "components/Like";
import { dislikeAnswer, likeAnswer } from "context/postsReducer/actions";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { FC } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { answer } from "types/comment";
import styles from "./Answer.module.scss";

interface props {
  commentId: number,
  answer: answer,
  onAnswer: (id: number, username: string) => void;
}

const Answer: FC<props> = ({ commentId, answer, onAnswer }) => {
  const params = useParams();
  const isAuth = useAppSelector(state => state.authReducer.isAuth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const like = async () => {
    if (!isAuth) {
      navigate("/auth/navigate");
      return;
    }

    if (answer.isLiked) {
      dispatch(dislikeAnswer(Number(params.id), commentId, answer.id));
    } else {
      dispatch(likeAnswer(Number(params.id), commentId, answer.id));
    }
  }

  return (
    <div className={styles.container}>
      <Link
        className={styles.avatar}
        style={{'backgroundImage': `url(http://127.0.0.1:8000${answer.user.avatar})`}}
        to={`/profile/${answer.user.username}`}
      />
      <div className={styles.info}>
        <div className={styles.header}>
          <Link
            className={styles.username}
            to={`/profile/${answer.user.username}`}
          >
            {answer.user.username}
          </Link>
          <div className={styles.like}>
            <Like
              isActive={answer.isLiked}
              handler={like}
              heartSize={12}
              fontSize={12}
              value={answer.likes}
            />
          </div>
        </div>
        <div className={styles.text}>
          {answer.text}
        </div>
        <div className={styles.footer}>
          <div className={styles.date}>
            {answer.published_at}
          </div>
          <div
            className={styles.answer}
            onClick={() => onAnswer(answer.answer_to, answer.user.username)}
          >
            Ответить
          </div>
        </div>
      </div>
    </div>
  );
}

export default Answer;
