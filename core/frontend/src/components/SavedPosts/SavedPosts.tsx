import React, {FC} from "react";
import PostList from "components/PostList";
import {LoaderIcon} from "components/icons/LoaderIcon";
import SavedPostsFetchLogic from "./SavedPostsFetchLogic";
import styles from "pages/ProfilePage/UserPosts/UserPosts.module.scss";

interface props {
  collectionId?: number
}

const SavedPosts: FC<props> = ({ collectionId }) => {
  const {
    posts,
    hasNextPage,
    lastElement
  } = SavedPostsFetchLogic(collectionId!);

  return (
    <>
      <PostList posts={posts} />
      {hasNextPage && posts.length > 0 &&
        <div className={styles.loader} ref={lastElement}>
          <LoaderIcon />
        </div>
      }
    </>
  );
}

export default SavedPosts;
