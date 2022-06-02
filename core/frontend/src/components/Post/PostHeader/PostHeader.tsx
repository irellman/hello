import {post} from "types/post";
import {FC} from "react";
import {useAppSelector} from "hooks/redux";
import ThreeDotsIcon from "components/icons/ThreeDotsIcon";
import styles from "./PostHeader.module.scss";
import {Link} from "react-router-dom";
import SubscribeButton from "./SubscribeButton";

interface props {
  post: post
}

const PostHeader: FC<props> = ({ post }) => {
  const authUser = useAppSelector(state => state.authReducer.user!);

  return (
    <div className={styles.container}>
      <Link
        className={styles.avatar}
        to={`/profile/${post.publisher.username}`}
        state={{id: post.id}}
        style={{backgroundImage: `url(http://127.0.0.1:8000${post.publisher.avatar})`}}
      />
      <div className={styles.info}>
        <Link
          className={styles.username}
          to={`/profile/${post.publisher.username}`}
          state={{id: post.id}}
        >
          {post.publisher.username}
        </Link>
        <div className={styles.publish_date}>{post.published_at}</div>
      </div>
      {authUser!.username !== post.publisher.username &&
        <SubscribeButton
          username={post.publisher.username}
          isSubscribe={post.publisher.subscribe}
        />
      }
      <div className={styles.options}>
        <ThreeDotsIcon
          cname={styles.icon}
          size={25}
          color="rgb(40, 40, 40)"
        />
      </div>
    </div>
  );
}

export default PostHeader;
