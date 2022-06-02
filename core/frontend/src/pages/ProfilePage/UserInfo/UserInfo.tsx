import {FC} from 'react'
import {Link, useParams} from 'react-router-dom'
import {useAppDispatch, useAppSelector} from 'hooks/redux'
import styles from "./UserInfo.module.scss";
import UserStats from "./UserStats";
import CogsIcon from "components/icons/CogsIcon";
import {subscribe, unsubscribe} from "context/userReducer/actions";

const UserInfo: FC = () => {
  const user = useAppSelector(state => state.userReducer);
  const authUser = useAppSelector(state => state.authReducer.user!);
  const { username } = useParams();
  const WindowWidth = useAppSelector(state => state.appReducer.width);

  const dispatch = useAppDispatch();

  return (
    user.id !== 0 ?
      <div className={styles.container}>
        <div className={styles.avatar} style={{backgroundImage: `url(http://127.0.0.1:8000${user.avatar})`}} />
        {WindowWidth < 640 &&
          <UserStats />
        }
        <div className={styles.bio}>
          <div className={styles.header}>
            {WindowWidth >= 640 &&
              <>
                <div className={styles.username}>{user.username}</div>
                {authUser.username === username ?
                  <Link to="/edit" className={styles.settings}>
                    <CogsIcon className={styles.icon} size={15} color="rgb(40, 40, 40)" />
                    Редактировать профиль
                  </Link>
                :
                  user.subscribe ?
                    <div
                      className={styles.unsubscribe}
                      onClick={() => dispatch(unsubscribe(user.username))}
                    >
                      Вы подписаны
                    </div>
                  :
                    <div
                      className={styles.subscribe}
                      onClick={() => dispatch(subscribe(user.username))}
                    >
                      Подписаться
                    </div>
                }
              </>
            }
          </div>
          {WindowWidth >= 640 &&
            <UserStats />
          }
          {user.name &&
            <div className={styles.name}>{user.name}</div>
          }
          {user.about &&
            <div className={styles.description}>{user.about}</div>
          }
          {user.website &&
            <div className={styles.website}>
              <a href={user.website} target="_blank">{user.website}</a>
            </div>
          }
        </div>
      </div>
    :
      <></>
  );
}

export default UserInfo;
