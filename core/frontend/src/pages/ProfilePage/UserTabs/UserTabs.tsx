import {FC, useEffect, useState} from "react";
import AppsIcon from "components/icons/AppsIcon";
import styles from "./UserTabs.module.scss";
import {Link, useLocation} from "react-router-dom";
import { useAppSelector } from "hooks/redux";

const UserTabs: FC = () => {
  const [activeTab, setActiveTab] = useState<string>("");
  const location = useLocation();
  const windowWidth = useAppSelector(state => state.appReducer.width);

  useEffect(() => {
    if (location.pathname.endsWith("/saved")) {
      setActiveTab("saved");
    } else {
      setActiveTab("posts");
    }
  }, [location]);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <Link
          to=""
          className={activeTab === "posts" ? styles.tab_active : styles.tab}
          onClick={() => setActiveTab("posts")}
        >
          <AppsIcon size={windowWidth >= 640 ? 15 : 24} className={styles.icon} />
          {windowWidth >= 640 &&
            "Публикации"
          }
        </Link>
      </div>
    </div>
  );
}

export default UserTabs;
