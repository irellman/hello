import { FC, useState } from "react";
import { addToSaved, deleteFromSaved } from "api/post";
import { post } from "types/post";
import {useAppSelector} from "hooks/redux";
import BookmarkIcon from "components/icons/BookmarkIcon";
import styles from "./Saved.module.scss";
import {useNavigate} from "react-router-dom";

interface props {
  post: post
}

const Saved: FC<props> = ({ post }) => {
  const [isSaved, setIsSaved] = useState<boolean>(post.isSaved);
  const [fetchTimeout, setFetchTimeout] = useState<any>(null);
  const isAuth = useAppSelector(state => state.authReducer.isAuth);
  const navigate = useNavigate();

  const save = () => {
    if (!isAuth) {
      navigate("/auth/login");
      return;
    }
    clearTimeout(fetchTimeout);

    if (isSaved) {
      setIsSaved(false);
    } else {
      setIsSaved(true);
    }

    setFetchTimeout(setTimeout(async () => {
      if (isSaved) {
        await deleteFromSaved(post.id);
      } else {
        await addToSaved(post.id);
      }
    }, 500));
  }

  return (
    <>
      <BookmarkIcon
        className={styles.bookmark}
        size={25}
        color="rgb(40, 40, 40)"
        onClick={() => save()}
        filled={isSaved}
      />
    </>
  );
}

export default Saved;
