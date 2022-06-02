import React, {FC, useEffect, useRef} from "react";
import {createPortal} from "react-dom";
import styles from "./Modal.module.scss";

interface props {
  open: boolean,
  onMouseDown: () => void
}

const Modal: FC<props> = ({ open, onMouseDown, children }) => {
  const modalRoot = document.querySelector("body")!;
  const modal = useRef<any>();

  useEffect(() => {
    const body = document.querySelector("body")!;

    return () => {
      body.removeAttribute("style");
    }
  }, []);

  useEffect(() => {
    const body = document.querySelector("body")!;

    if (open) {
      body.style.overflow = "hidden";
    } else {
      body.removeAttribute("style");
    }
  }, [open]);

  const close = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === modal.current) {
      onMouseDown();
    }
  }

  return createPortal(
    open ?
      <div className={styles.modal_wrapper} onMouseDown={(e) => close(e)} ref={modal}>
        {children}
      </div>
      :
      <></>,
    modalRoot
  )
}

export default Modal;
