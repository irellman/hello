import {FC} from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import styles from "./MainHeader.module.scss";

interface props {
  setModalIsOpen: (value: boolean) => void
}

const MainHeader: FC<props> = ({ setModalIsOpen }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.title}>Список сохраненного виден только вам</div>
        <div className={styles.add} onClick={() => setModalIsOpen(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      </div>
    </div>
  )
}

export default MainHeader;
