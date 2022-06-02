import {useAppDispatch, useAppSelector} from "hooks/redux";
import Header from "components/Header";
import PostsFeed from "components/PostsFeed";
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {userReducer} from "context/userReducer/reducer";
import {getUserByUsername} from "context/userReducer/actions";
import {LoaderIcon} from "components/icons/LoaderIcon";
import UserPostsFetchLogic from "../UserPostsFetchLogic";
import styles from "../UserPosts/UserPosts.module.scss";

const UserPostsFeed = () => {
  const {lastElement, hasNextPage, posts} = UserPostsFetchLogic();
  const windowWidth = useAppSelector(state => state.appReducer.width);
  const { username } = useParams();
  const user = useAppSelector(state => state.userReducer);
  const dispatch = useAppDispatch();
  const { clearUser } = userReducer.actions;

  useEffect(() => {
    if (user.id === 0) {
      dispatch(clearUser());
      dispatch(getUserByUsername(username!));
    }
  }, []);

  return (
    <>
      {windowWidth < 640 &&
        <Header>Посты</Header>
      }
      <PostsFeed posts={posts} />
      {hasNextPage && posts.length > 0 &&
        <div className={styles.loader} ref={lastElement}>
          <LoaderIcon />
        </div>
      }
    </>
  );
}

export default UserPostsFeed;
