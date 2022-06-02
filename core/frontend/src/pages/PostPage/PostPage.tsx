import axios from "axios";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import React, {useEffect, useMemo} from "react";
import { useParams } from "react-router-dom";
import styles from "./PostPage.module.scss";
import {currentPostReducer} from "context/currentPost/reducer";

const Post = React.lazy(() => import("components/Post"));

const PostPage = () => {
  const { id } = useParams();
  const posts = useAppSelector(state => state.postsReducer.posts)!;
  const currentPost = useAppSelector(state => state.currentPostReducer);
  const dispatch = useAppDispatch();
  const { setPost } = currentPostReducer.actions;

  const post = useMemo(() => {
    if (posts.length) {
      return posts.find(item => {return item.id === Number(id)})!;
    } else {
      return currentPost
    }
  }, [posts])

  useEffect(() => {
    if (!posts.length) {
      getPost();
    }
  }, []);

  const getPost = async () => {
    const res = await axios.post(`http://127.0.0.1:8000/api/post/${id}`);
    const data = res.data;

    dispatch(setPost(data));
  }

  return (
    <div className={styles.container}>
      {post &&
        <Post id={post.id} withComments={true} />
      }
    </div>
  );
}

export default PostPage;
