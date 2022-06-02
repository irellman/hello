import React, {FC, useEffect} from 'react'
import {LoaderIcon} from "components/icons/LoaderIcon";
import UserPostsFetchLogic from "../UserPostsFetchLogic";
import styles from "./UserPosts.module.scss";
import PostList from "components/PostList";
import {useLocation, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {postsReducer} from "context/postsReducer/reducer";

const UserPosts: FC = () => {
  const { username } = useParams();
  const user = useAppSelector(state => state.userReducer);
  const location = useLocation();
  const dispatch = useAppDispatch();
  const {
    lastElement,
    hasNextPage,
    posts
  } = UserPostsFetchLogic();

  const { clearPosts } = postsReducer.actions;

  useEffect(() => {
    if (username !== user.username) {
      dispatch(clearPosts());
    }
  }, [username]);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (!location.state) return;

    const { id } = location.state as {id: number};

    const el = document.querySelector(`div[data-id="${id}"]`);

    if (!el) return;

    const coords = el.getBoundingClientRect();

    window.scrollTo(0, coords.top - 110)
  }, [])

  return (
    <div className={styles.container}>
      <PostList posts={posts} />
      {hasNextPage && posts.length > 0 &&
        <div className={styles.loader} ref={lastElement}>
          <LoaderIcon />
        </div>
      }
    </div>
  );
}

export default UserPosts;
