import {FC, lazy, useEffect} from "react";
import styles from "./ProfilePage.module.scss";
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {userReducer} from "context/userReducer/reducer";
import Header from "components/Header";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {getUserByUsername} from "context/userReducer/actions";

const UserInfo = lazy(() => import("./UserInfo"));
const UserTabs = lazy(() => import("./UserTabs"));
const UserPosts = lazy(() => import("./UserPosts"));

const ProfilePage: FC = () => {
  const user = useAppSelector(state => state.userReducer);
  const { username } = useParams();
  const dispatch = useAppDispatch();
  const windowWidth = useAppSelector(state => state.appReducer.width);
  const navigate = useNavigate();

  const { clearUser } = userReducer.actions;

  useEffect(() => {
    if (username !== user.username) {
      dispatch(clearUser());
      dispatch(getUserByUsername(username!));
    }
  }, [username]);

  return (
    <>
      {windowWidth < 640 &&
        <Header>
          <div className={styles.header_container}>
            <FontAwesomeIcon className={styles.icon} icon={faArrowLeft} size="lg" onClick={() => navigate(-1)} />
            <div className={styles.username}>{ username }</div>
            <FontAwesomeIcon className={styles.icon}  icon={faEllipsis} size="lg" />
          </div>
        </Header>
      }
      <div className={styles.container}>
        <UserInfo />
        <UserTabs />
        {user.id !== 0 &&
          <UserPosts />
        }
      </div>
    </>
  );
}

export default ProfilePage;
