import {FC} from "react";
import styles from "./MainModal.module.scss";

interface props {
  setModalName: (value: string) => void
}

const MainModal: FC<props> = ({ setModalName }) => {
  return (
    <div className={styles.modal}>
      <div
        className={styles.modal_option_danger}
        onClick={() => setModalName("DeleteModal")}
      >
        Удаление подборки
      </div>
      <div
        className={styles.modal_option}
        onClick={() => setModalName("EditModal")}
      >
        Переименовать подборку
      </div>
      <div
        className={styles.modal_option}
        onClick={() => setModalName("AddModal")}
      >
        Добавить из "Сохранённого"
      </div>
      <div
        className={styles.modal_option}
        onClick={() => setModalName("")}
      >
        Отмена
      </div>
    </div>
  )
}

export default MainModal;
