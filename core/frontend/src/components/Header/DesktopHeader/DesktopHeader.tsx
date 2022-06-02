import {Link} from "react-router-dom";
import HomeIcon from "components/icons/HomeIcon";
import MessangerIcon from "components/icons/MessangerIcon";
import PublishIcon from "components/icons/PublishIcon";
import ExploreIcon from "components/icons/ExploreIcon";
import HeartIcon from "components/icons/HeartIcon";
import React from "react";
import {useAppSelector} from "hooks/redux";
import HeaderSearch from "./HeaderSearch";
import styles from "./DesktopHeader.module.scss";
import User from "./User";

const DesktopHeader = () => {
  const isAuth = useAppSelector(state => state.authReducer.isAuth);

  return (
    <div className={styles.container}>
      <Link className={styles.logo} to="/">
        <div className={styles.image} />
      </Link>
      {isAuth &&
        <>
          <HeaderSearch />
          <div className={styles.nav}>
            <Link className={styles.link} to="">
              <HomeIcon
                size={24}
                color="rgb(40, 40, 40)"
              />
            </Link>
            <Link className={styles.link} to="">
              <MessangerIcon
                size={24}
                color="rgb(40, 40, 40)"
              />
            </Link>
            <Link className={styles.link} to="">
              <PublishIcon
                size={24}
                color="rgb(40, 40, 40)"
              />
            </Link>
            <Link className={styles.link} to="">
              <ExploreIcon
                size={24}
                color="rgb(40, 40, 40)"
              />
            </Link>
            <Link className={styles.link} to="">
              <HeartIcon
                size={24}
                color="rgb(40, 40, 40)"
              />
            </Link>
            <User />
          </div>
        </>
      }
    </div>
  );
}

export default DesktopHeader;
