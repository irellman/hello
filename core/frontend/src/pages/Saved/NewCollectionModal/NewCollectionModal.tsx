import styles from "./NewCollectionModal.module.scss";
import {FC, useState} from "react";
import {useAppDispatch} from "hooks/redux";
import {createNewCollection} from "context/collectionsReducer/actions";

interface props {
  setModalIsOpen: (value: boolean) => void
}

const NewCollectionModal: FC<props> = ({ setModalIsOpen }) => {
  const [collectionName, setCollectionName] = useState<string>("");
  const dispatch = useAppDispatch();

  const create = async () => {
    if (!collectionName.length) {
      return;
    }

    dispatch(createNewCollection(collectionName));
    setModalIsOpen(false);
  }

  return (
    <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
      <div className={styles.header}>Новая подборка</div>
      <div className={styles.body}>
        <input
          className={styles.input}
          type="text"
          placeholder="Введите название подборки"
          value={collectionName}
          onChange={(e) => setCollectionName(e.target.value)}
        />
      </div>
      <div
        className={collectionName.length ? styles.button : styles.button_disabled}
        onClick={() => create()}
      >
        Создать
      </div>
    </div>
  )
}

export default NewCollectionModal;
