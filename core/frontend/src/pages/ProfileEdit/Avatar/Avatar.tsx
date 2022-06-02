import {useAppDispatch, useAppSelector} from "hooks/redux";
import axios from "axios";
import {authReducer} from "context/auth/reducer";
import styles from "./Avatar.module.scss";

const Avatar = () => {
  const user = useAppSelector(state => state.authReducer.user)!;
  const dispatch = useAppDispatch();
  const { setAvatar } = authReducer.actions;

  const changeAvatar = async (e: any) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("avatar", file);

    const res = await axios.post("http://127.0.0.1:8000/user/avatar", formData);
    const data = res.data;

    if (data.avatar) {
      dispatch(setAvatar(data.avatar));
      const userToChange = JSON.parse(localStorage.getItem("user")!);
      userToChange.avatar = data.avatar;
      localStorage.setItem("user", JSON.stringify(userToChange));
    }
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.avatar}
        style={{backgroundImage: `url(http://127.0.0.1:8000${user.avatar})`}}
      >
        <input
          className={styles.file_input}
          onChange={(e) => changeAvatar(e)}
          type="file"
        />
      </div>
    </div>
  );
}

export default Avatar;
