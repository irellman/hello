import styles from "./UserDropdown.module.scss";
import UserIcon from "components/icons/UserIcon";
import CogsIcon from "components/icons/CogsIcon";
import BookmarkIcon from "components/icons/BookmarkIcon";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSignOut} from "@fortawesome/free-solid-svg-icons";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {Link} from "react-router-dom";
import {FC} from "react";
import {logout} from "context/auth/actions";

interface props {
  dropdownIsOpen: boolean,
  setDropdownIsOpen: (value: boolean) => void
}

const UserDropdown: FC<props> = ({ dropdownIsOpen, setDropdownIsOpen }) => {
  const user = useAppSelector(state => state.authReducer.user)!;
  const dispatch = useAppDispatch();

  const userLogout = () => {
    dispatch(logout());
    setDropdownIsOpen(false);
  }

  return (
    <div className={dropdownIsOpen ? styles.container_visible : styles.container}>
      <Link
        to={`/profile/${user.username}`}
        className={styles.option}
        onClick={() => setDropdownIsOpen(false)}
      >
        <UserIcon size={15} color="rgb(40, 40, 40)" />Профиль
      </Link>
      <Link
        to={`/saved`}
        className={styles.option}
        onClick={() => setDropdownIsOpen(false)}
      >
        <BookmarkIcon size={15} color="rgb(40, 40, 40)" />Сохранённое
      </Link>
      <div
        className={styles.option}
        onClick={() => setDropdownIsOpen(false)}
      >
        <CogsIcon size={15} color="rgb(40, 40, 40)" />Настройки
      </div>
      <div
        className={styles.option}
        onClick={() => userLogout()}
      >
        <FontAwesomeIcon className={styles.icon} icon={faSignOut} />Выход
      </div>
    </div>
  );
}

export default UserDropdown;
