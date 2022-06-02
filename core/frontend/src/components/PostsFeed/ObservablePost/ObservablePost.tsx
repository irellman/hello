import {FC, useEffect, useRef, useState} from "react";
import {comment, post} from "types/post";
import Post from "components/Post";
import styles from "../PostsFeed.module.scss";
import axios from "axios";
import {postsReducer} from "../../../context/postsReducer/reducer";
import {useAppDispatch} from "../../../hooks/redux";

interface props {
  post: post
}

const ObservablePost: FC<props> = ({ post }) => {
  const element = useRef<any>();
  const observer = useRef<any>();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    observer.current = new IntersectionObserver(callback);
    observer.current.observe(element.current);
  }, [])

  const callback = (entries: any, observer: any) => {
    setIsVisible(entries[0].isIntersecting);
  }

  return (
    <div className={styles.post} data-id={post.id} ref={element}>
      {isVisible &&
        <Post
          id={post.id}
          withComments={false}
        />
      }
    </div>
  )
}

export default ObservablePost;
