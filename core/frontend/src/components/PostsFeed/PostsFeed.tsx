import styles from "./PostsFeed.module.scss";
import {useLocation} from "react-router-dom";
import {FC, useEffect, useRef} from "react";
import {post} from "types/post";
import ObservablePost from "./ObservablePost/ObservablePost";

interface props {
  posts: post[]
}

const PostsFeed: FC<props> = ({ posts }) => {
  const location = useLocation();
  const container = useRef<any>();

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!location.state) {
      return;
    }

    const { id } = location.state as {id: number};
    const el = document.querySelector(`div[data-id="${id}"]`);

    if (!el) {
      return;
    }

    const coords = el.getBoundingClientRect();

    window.scrollTo(0, coords.top - 65);
  }, []);

  return (
    <div className={styles.container} ref={container}>
      {posts.map((post: post, index: number) => {
        return (
          <ObservablePost post={post} key={index} />
        );
      })}
    </div>
  );
}

export default PostsFeed;
