import styles from "./PostActions.module.scss";
import Like from "components/Like";
import CommentsIcon from "components/icons/CommentsIcon";
import Saved from "./Saved";
import {FC} from "react";
import { post } from "types/post";
import {useNavigate} from "react-router-dom";

interface props {
  post: post,
  onLike: (post: number) => void,
  withComments: boolean
}

const PostActions: FC<props> = ({ post, onLike, withComments }) => {
  const navigate = useNavigate();

  const navToComments = () => {
    if (post.commentsCount > 0) {
      navigate(`/post/${post.id}`);
    }
  }

  return (
    <div className={styles.actions}>
      <div className={styles.left_actions}>
        <Like
          isActive={post.isLiked}
          handler={() => onLike(Number(post.id))}
          heartSize={25}
          fontSize={16}
          value={post.likes}
        />
        {!withComments &&
          <div className={styles.action} onClick={() => navToComments()}>
            <CommentsIcon className={styles.icon} size={25} color={"rgb(40, 40, 40)"} />
            <div className={styles.action_value}>{post.commentsCount}</div>
          </div>
        }
      </div>
      <div className={styles.right_actions}>
        <Saved post={post} />
      </div>
    </div>
  )
}

export default PostActions;
