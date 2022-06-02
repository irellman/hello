import styles from "./DeleteModal.module.scss";
import {FC} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {deleteCollection} from "context/collectionsReducer/actions";

interface props {
  setModalName: (value: string) => void
}

const DeleteModal: FC<props> = ({ setModalName }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const removeCollection = async () => {
    dispatch(deleteCollection(Number(id)));
    navigate(`/saved`);
    setModalName("");
  }

  return (
    <div className={styles.modal}>
      <div className={styles.body}>
        <div className={styles.title}>Удалить подборку?</div>
        <div className={styles.subtitle}>Если вы удалите эту подборку, входящие в нее фото и видео будут сохранены.</div>
      </div>
      <div className={styles.footer}>
        <div className={styles.option_danger} onClick={() => removeCollection()}>Удалить</div>
        <div className={styles.option} onClick={() => setModalName("MainModal")}>Назад</div>
      </div>
    </div>
  )
}

export default DeleteModal;
