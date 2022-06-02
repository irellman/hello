import React, {useEffect, useRef, useState} from "react";
import {useAppSelector} from "hooks/redux";
import styles from "./User.module.scss";
import UserDropdown from "./UserDropdown";

const User = () => {
  const user = useAppSelector(state => state.authReducer.user);
  const [dropdownIsOpen, setDropdownIsOpen] = useState<boolean>(false);
  const container = useRef<any>();

  useEffect(() => {
    document.addEventListener("click", closeDropdown);

    return () => {
      document.removeEventListener("click", closeDropdown);
    }
  }, []);

  const closeDropdown = (e: MouseEvent) => {
    const className: string = container.current.classList.value;
    const target: any = e.target;

    if (target.closest(`.${className}`) === null) {
      setDropdownIsOpen(false);
    }
  }

  return (
    <div className={styles.container} ref={container}>
      <div
        className={styles.user}
        onClick={() => setDropdownIsOpen(true)}
        style={{backgroundImage: `url(http://127.0.0.1:8000${user!.avatar})`}}
      />
      <UserDropdown dropdownIsOpen={dropdownIsOpen} setDropdownIsOpen={setDropdownIsOpen} />
    </div>
  )
}

export default User;
