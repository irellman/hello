import {FC, useEffect, useState} from "react";
import HeartIcon from "../icons/HeartIcon";
import FilledHeartIcon from "../icons/FilledHeartIcon";
import styles from "./Like.module.scss";

interface props {
  isActive: boolean,
  handler: () => void,
  heartSize: number,
  fontSize: number,
  value: number
}

const Like: FC<props> = ({isActive, handler, heartSize, value, fontSize}) => {
  const [color, setColor] = useState("rgb(40, 40, 40)");

  useEffect(() => {
    if (isActive) {
      setColor("rgb(237, 73, 86)")
    }
  }, [isActive, color])

  return (
    <>
      {isActive !== undefined &&
        <div
          className={isActive ? styles.container_active : styles.container}
          onMouseEnter={() => setColor("rgb(160, 160, 160)")}
          onMouseLeave={() => setColor("rgb(40, 40, 40)")}
          onClick={() => handler()}
        >
          <div
            className={styles.like}
            style={{
              width: `${heartSize}px`,
              height: `${heartSize}px`
            }}
          >
            <div className={styles.heart_container}>
              {isActive ?
                <FilledHeartIcon
                  className={styles.filled_heart}
                  size={heartSize}
                  color="rgb(237, 73, 86)"
                />
                :
                <HeartIcon
                  className={styles.heart}
                  size={heartSize}
                  color={color}
                />
              }
            </div>
          </div>
          <div className={styles.value} style={{fontSize: `${fontSize}px`}}>{value}</div>
        </div>
      }
    </>
  );
}

export default Like;
