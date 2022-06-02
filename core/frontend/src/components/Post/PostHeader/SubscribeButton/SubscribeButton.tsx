import {FC, useState} from "react";
import axios from "axios";
import styles from "./SubscribeButton.module.scss";

interface props {
  username: string,
  isSubscribe: boolean
}

const SubscribeButton: FC<props> = ({ username, isSubscribe }) => {
  const [userSubscribe, setUserSubscribe] = useState<boolean>(isSubscribe);

  const subscribe = async () => {
    setUserSubscribe(true);

    const formData = new FormData();
    formData.append("username", username);
    await axios.post("http://127.0.0.1:8000/user/subscribe", formData);
  }

  const unsubscribe = async () => {
    setUserSubscribe(false);

    const formData = new FormData();
    formData.append("username", username);
    await axios.post("http://127.0.0.1:8000/user/unsubscribe", formData);
  }

  return (
    userSubscribe ?
      <div className={styles.unsubscribe} onClick={() => unsubscribe()}>Подписки</div>
      :
      <div className={styles.subscribe} onClick={() => subscribe()}>Подписаться</div>
  );
}

export default SubscribeButton;
