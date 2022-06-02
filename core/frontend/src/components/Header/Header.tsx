import React, {FC} from "react";
import styles from "./Header.module.scss";
import {createPortal} from "react-dom";

const Header: FC = ({ children }) => {
  const root = document.getElementById("root")!;

  return createPortal(
    <div className={styles.header}>
      {children}
    </div>,
    root
  );
}

export default Header;
