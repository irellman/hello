import React, {FC, useEffect, useRef, useState} from "react";
import axios from "axios";
import CheckIcon from "components/icons/CheckIcon";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {useParams} from "react-router-dom";
import {collectionsReducer} from "context/collectionsReducer/reducer";
import {LoaderIcon} from "components/icons/LoaderIcon";
import SavedPostsLogic from "./savedPostsLogic";
import styles from "./AddModal.module.scss";
import {postsReducer} from "context/postsReducer/reducer";

interface props {
  setModalName: (value: string) => void
}

const AddModal: FC<props> = ({ setModalName }) => {
  const params = useParams();
  const [id] = useState<number>(typeof params.id === "string" && params.id !== "all-posts" ? Number(params.id) : 0);
  const [selectedPosts, setSelectedPosts] = useState<number[]>([]);
  const body = useRef<any>();
  const dispatch = useAppDispatch();
  const { savedPosts, hasNextPage, lastElement } = SavedPostsLogic();
  const postsFromCurrentCollection = useAppSelector(state => state.postsReducer.posts);
  const { setImage } = collectionsReducer.actions;
  const { setPosts } = postsReducer.actions;

  useEffect(() => {
    let result: number[] = [];

    for (let item of postsFromCurrentCollection) {
      result.push(item.id);
    }

    setSelectedPosts(result);
  }, []);

  const selectPost = (id: number) => {
    if (selectedPosts.indexOf(id) === -1) {
      setSelectedPosts([...selectedPosts, id]);
    } else {
      setSelectedPosts(selectedPosts.filter((item: any) => {return item !== id}));
    }
  }

  const done = async () => {
    const result = savedPosts.filter(post => {
      return selectedPosts.indexOf(post.id) !== -1;
    }).reverse();

    const image = result[0]?.images[0] ?? "";

    dispatch(setPosts(result));
    dispatch(setImage({collectionId: Number(id), image: image}));
    setModalName("");

    const formData = new FormData();
    formData.append("collection_id", String(id));
    formData.append("posts_id", String(selectedPosts));

    await axios.post("http://127.0.0.1:8000/api/collection/edit", formData);
  }

  return (
    <div className={styles.modal}>
      <div className={styles.header}>Добавить из "Сохрнанённого"</div>
      <div className={styles.body} ref={body}>
        {savedPosts &&
          savedPosts.map((post: any, index: number) => {
            return <div
              className={styles.post}
              style={{"backgroundImage": `url(http://127.0.0.1:8000${post.images[0]})`}}
              key={index}
              onClick={() => selectPost(post.id)}
            >
              <div className={selectedPosts.indexOf(post.id) !== -1 ? styles.post_wrapper_active : styles.post_wrapper}>
                {selectedPosts.indexOf(post.id) !== -1 &&
                  <CheckIcon />
                }
              </div>
            </div>
          })
        }
      </div>
      {hasNextPage && savedPosts.length > 0 &&
        <div className={styles.loader} ref={lastElement}>
          <LoaderIcon />
        </div>
      }
      <div className={styles.footer}>
        <div className={styles.option} onClick={() => setModalName("MainModal")}>Назад</div>
        <div className={styles.separator} />
        <div className={styles.option_next} onClick={() => done()}>Готово</div>
      </div>
    </div>
  );
}

export default AddModal;
