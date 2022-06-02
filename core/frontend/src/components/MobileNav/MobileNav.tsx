import {Link} from "react-router-dom";
import {useAppSelector} from "hooks/redux";
import HomeIcon from "components/icons/HomeIcon";
import ExploreIcon from "components/icons/ExploreIcon";
import PlusIcon from "components/icons/PlusIcon";
import HeartIcon from "components/icons/HeartIcon";
import styles from "./MobileNav.module.scss";

const MobileNav = () => {
  const user = useAppSelector(state => state.authReducer.user)!;

  return (
    <div className={styles.container}>
      <Link className={styles.link} to="/home"><HomeIcon size={24} color="rgb(40, 40, 40)" /></Link>
      <Link className={styles.link} to="/explore"><ExploreIcon size={24} color="rgb(40, 40, 40)" /></Link>
      <Link className={styles.link} to="/home"><PlusIcon size={24} color="rgb(40, 40, 40)" /></Link>
      <Link className={styles.link} to="/activity"><HeartIcon size={24} color="rgb(40, 40, 40)" /></Link>
      <Link className={styles.link} to={`/profile/${user.username}`}>
        <div className={styles.avatar} style={{backgroundImage: `url(http://127.0.0.1:8000${user.avatar})`}} />
      </Link>
    </div>
  );
}

export default MobileNav;
