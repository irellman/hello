import styles from "./EditModal.module.scss";
import {FC, useState} from "react";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {renameCollection} from "context/collectionsReducer/actions";

interface props {
  setModalName: (value: string) => void
}

const EditModal: FC<props> = ({ setModalName }) => {
  const { id } = useParams();
  const collections = useAppSelector(state => state.collectionsReducer);
  const collection = collections.find(collection => {
    return collection.id === (id === "all-posts" ? 0 : Number(id));
  })!;
  const [value, setValue] = useState<string>(collection.name);
  const dispatch = useAppDispatch();

  const rename = async () => {
    dispatch(renameCollection(Number(id), value));
    setModalName("");
  }

  return (
    <div className={styles.modal}>
      <div className={styles.header}>Переименование подборки</div>
      <div className={styles.body}>
        <input
          className={styles.input}
          type="text"
          placeholder="Введите название подборки"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.option} onClick={() => setModalName("MainModal")}>Назад</div>
        <div className={styles.separator} />
        <div
          className={`${value.length ? styles.option_next : styles.option_disabled}`}
          onClick={() => rename()}
        >Готово</div>
      </div>
    </div>
  )
}

export default EditModal;
