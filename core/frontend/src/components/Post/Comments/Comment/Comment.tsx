import { FC } from 'react';
import Like from 'components/Like';
import { comment, answer } from 'types/comment';
import CommentLogic from "./CommentLogic";
import styles from "./Comment.module.scss";
import {Link} from "react-router-dom";
import Answer from "./Answer";
import PlusIcon from "components/icons/PlusIcon";

interface props {
  comment: comment,
  onAnswer: (id: number, username: string) => void
}

const Comment: FC<props> = ({ comment, onAnswer }) => {
  const {
    like,
    getAnswers,
    isFetching,
    hasNextPage,
    showComments
  } = CommentLogic(comment);

  return (
    <div className={styles.container}>
      <Link className={styles.avatar}
        style={{'backgroundImage': `url(http://127.0.0.1:8000${comment.user.avatar})`}}
        to={`/profile/${comment.user.username}`}
      />
      <div className={styles.info}>
        <div className={styles.header}>
          <Link
            className={styles.username}
            to={`/profile/${comment.user.username}`}
          >
            {comment.user.username}
          </Link>
          <div className={styles.like}>
            <Like
              isActive={comment.isLiked}
              handler={like}
              heartSize={12}
              fontSize={12}
              value={comment.likes}
            />
          </div>
        </div>
        <div className={styles.text}>
          {comment.text}
        </div>
        <div className={styles.footer}>
          <div className={styles.date}>
            {comment.published_at}
          </div>
          <div
            className={styles.answer}
            onClick={() => onAnswer(comment.id, comment.user.username)}
          >
            Ответить
          </div>
        </div>
        {comment.comments_count !== 0 && comment.comments_count &&
          <div className={styles.answers}>
            {comment.isShowedAnswers ?
              <>
                {comment.answers!.map((answer: answer, index: number) => {
                  return <Answer
                    commentId={comment.id}
                    answer={answer}
                    onAnswer={onAnswer}
                    key={index}
                  />
                })}
                {hasNextPage && !isFetching &&
                  <div
                    className={styles.more_answers}
                    onClick={() => getAnswers()}
                  >
                    <PlusIcon size={25} color="rgb(40, 40, 40)" />Загрузить ещё
                  </div>
                }
              </>
              :
              <div
                className={styles.show_answers}
                onClick={() => showComments()}
              >
                Показать ответы ({comment.comments_count})
              </div>
            }
          </div>
        }
      </div>
    </div>
  );
}

export default Comment;
