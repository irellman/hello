import {post} from "types/post";
import styles from "./PostList.module.scss";
import {FC, useRef} from "react";
import Post from "./Post";

interface props {
  posts: post[];
}

const PostList: FC<props> = ({ posts = [] }) => {
  const container = useRef<any>();

  return (
    <div className={styles.container} ref={container}>
      {posts.length ?
        posts.map((post: post, index: number) => {
          return (
            <Post
              post={post}
              index={post.id}
              key={index}
            />
          );
        })
        :
        <></>
      }
    </div>
  );
}

export default PostList;
