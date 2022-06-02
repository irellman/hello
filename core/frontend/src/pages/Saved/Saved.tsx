import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {getCollections} from "context/collectionsReducer/actions";
import styles from "./Saved.module.scss";
import Modal from "components/Modal";
import NewCollectionModal from "./NewCollectionModal";
import Collections from "./Collections";
import MainHeader from "./MainHeader";
import SavedPosts from "components/SavedPosts";

const Saved = () => {
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const collections = useAppSelector(state => state.collectionsReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (collections.length === 0) {
      dispatch(getCollections());
    }
  }, []);

  return (
    <>
      <MainHeader setModalIsOpen={setModalIsOpen} />
      <div className={styles.container}>
        {collections.length === 0 &&
          <div className={styles.nothing}>
            <div className={styles.title}>Сохраняйте</div>
            <div className={styles.subtitle}>Сохраняйте фото и видео, которые хотите посмотреть снова. Никто не получит
              уведомления об этом, а сохраненные объекты сможете видеть только вы.
            </div>
          </div>
        }
        {collections.length > 1 ?
          <Collections />
        :
          <SavedPosts />
        }
      </div>
      <Modal
        open={modalIsOpen}
        onMouseDown={() => setModalIsOpen(false)}
      >
        <NewCollectionModal setModalIsOpen={setModalIsOpen} />
      </Modal>
    </>
  );
}

export default Saved;
