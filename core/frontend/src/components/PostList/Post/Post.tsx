import {FC, useEffect, useRef, useState} from "react";
import {post} from "types/post";
import styles from "../PostList.module.scss";
import HeartIcon from "components/icons/HeartIcon";
import CommentsIcon from "components/icons/CommentsIcon";
import {useNavigate} from "react-router-dom";

interface props {
  post: post,
  index: number
}

const Post: FC<props> = ({ post, index }) => {
  const navigate = useNavigate();
  const postRef = useRef<any>();
  const [postIsVisible, setPostIsVisible] = useState<boolean>(false);
  const observer = useRef<any>();

  const setPostAndNavigate = (post: post) => {
    navigate(`posts`, {state: {id: post.id}});
  }

  useEffect(() => {
    const callback = function (entries: any, observer: any) {
      if (entries[0].isIntersecting) {
        setPostIsVisible(true);
      } else {
        setPostIsVisible(false);
      }
    }

    observer.current = new IntersectionObserver(callback);
    observer.current.observe(postRef.current);
  }, []);

  return (
    <div style={{height: "300px"}} data-id={index} ref={postRef}>
      {postIsVisible &&
        <div
          className={styles.post}
          style={{backgroundImage: `url(http://127.0.0.1:8000${post.images[0]})`}}
          onClick={() => setPostAndNavigate(post)}
        >
          <div className={styles.post_info}>
            <div className={styles.info}>
              <HeartIcon className={styles.icon} size={25} color="rgb(255, 255, 255)"/>{post.likes}
            </div>
            <div className={styles.info}>
              <CommentsIcon
                className={styles.icon}
                size={25}
                color="rgb(255, 255, 255)"
              />
              {post.commentsCount}
            </div>
          </div>
        </div>
      }
    </div>
  );
}

export default Post;
