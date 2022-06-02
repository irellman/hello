import {FC} from "react";
import styles from "./UserStat.module.scss";

interface props {
  type: string,
  value: number
}

const UserStat: FC<props> = ({ type, value }) => {
  const convertValue = (value: number): string => {
    if (value >= 1000 && value < 1000000) {
      return `${(value / 1000).toFixed(1)} тыс.`;
    } else if (value >= 1000000 && value < 1000000000) {
      return `${(value / 1000000).toFixed(2)} млн.`;
    } else if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(2)} млрд.`;
    } else {
      return `${value}`;
    }
  }

  return (
    <div className={styles.stat}>
      <div className={styles.value}>{convertValue(value)}</div>
      <div className={styles.type}>{type}</div>
    </div>
  );
}

export default UserStat;
