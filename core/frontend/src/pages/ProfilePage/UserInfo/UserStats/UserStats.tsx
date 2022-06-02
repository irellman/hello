import {FC} from "react";
import {useAppSelector} from "hooks/redux";
import UserStat from "./UserStat";
import styles from "./UserStats.module.scss";

const UserStats: FC = () => {
  const user = useAppSelector(state => state.userReducer);

  return (
    <div className={styles.stats}>
      <UserStat type="публикаций" value={user.posts_count} />
      <UserStat type="подписчиков" value={user.followers} />
      <UserStat type="лайков" value={user.likes} />
    </div>
  );
}

export default UserStats;
