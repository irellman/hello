import Modal from "components/Modal";
import SavedPosts from "components/SavedPosts";
import { getCollections } from "context/collectionsReducer/actions";
import { postsReducer } from "context/postsReducer/reducer";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { FC, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import AddModal from "./Modals/AddModal";
import DeleteModal from "./Modals/DeleteModal";
import EditModal from "./Modals/EditModal";
import MainModal from "./Modals/MainModal";
import styles from "./Posts.module.scss";
import PostsHeader from "./PostsHeader";

const CollectionsPosts: FC = () => {
  const params = useParams();
  const [id] = useState<number>(params.id === "all-posts" ? 0 : Number(params.id));
  const collections = useAppSelector(state => state.collectionsReducer);
  const collection = collections.find(item => {return item.id === id})!;
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.postsReducer.posts);
  const hasNextPage = useAppSelector(state => state.postsReducer.hasNextPage);
  const [modalName, setModalName] = useState<string>("");

  const { clearPosts } = postsReducer.actions;

  const activeModal = useMemo(() => {
    switch (modalName) {
      case "MainModal":
        return <MainModal setModalName={setModalName} />
      case "DeleteModal":
        return <DeleteModal setModalName={setModalName} />
      case "EditModal":
        return <EditModal setModalName={setModalName} />
      case "AddModal":
        return <AddModal setModalName={setModalName} />
      default:
        return <></>
    }
  }, [modalName]);

  useEffect(() => {
    if (!collections.length) {
      dispatch(clearPosts());
      dispatch(getCollections());
    }
  }, []);

  return (
    <>
      {collection &&
        <>
          <PostsHeader
            collectionName={collection?.name}
            setModalName={setModalName}
          />
          <div className={styles.container}>
            {posts &&
              <SavedPosts collectionId={collection.id} />
            }
            {!posts.length && !hasNextPage &&
              <div className={styles.empty_body}>
                <div className={styles.body_title}>Начните сохранять</div>
                <div className={styles.subtitle}>Сохраняйте фото и видео в вашу подборку.</div>
                <div
                  className={styles.add_posts_button}
                  onClick={() => setModalName("AddModal")}
                >Добавить в подборку</div>
              </div>
            }
          </div>
          <Modal
            open={!!modalName.length}
            onMouseDown={() => setModalName("")}
          >
            {activeModal}
          </Modal>
        </>
      }
    </>
  );
}

export default CollectionsPosts;
