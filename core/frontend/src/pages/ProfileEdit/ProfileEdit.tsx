import {FC, useMemo, useState} from "react";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import styles from "./ProfileEdit.module.scss"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Avatar from "./Avatar";
import Input from "./Input";
import Textarea from "./Textarea";
import {authReducer} from "context/auth/reducer";
import {userReducer} from "context/userReducer/reducer";

const ProfileEdit: FC = () => {
  const user = useAppSelector(state => state.authReducer.user!);
  const [username, setUsername] = useState<string>(user.username);
  const [name, setName] = useState<string>(user.name);
  const [email, setEmail] = useState<string>(user.email);
  const [website, setWebsite] = useState<string>(user.website);
  const [about, setAbout] = useState<string>(user.about);

  const dispatch = useAppDispatch();
  const { setAuthUser } = authReducer.actions;
  const { clearUser } = userReducer.actions;
  const navigate = useNavigate();

  const submitButtonIsDisable = useMemo(() => {
    if (username !== user.username) {
      return false;
    }

    if (name !== user.name) {
      return false;
    }

    if (email !== user.email) {
      return false;
    }

    if (website !== user.website) {
      return false;
    }

    if (about !== user.about) {
      return false;
    }

    return true;
  }, [username, name, email, website, about])

  const submit = async () => {
    if(submitButtonIsDisable) {
      return;
    }

    const formData = new FormData();

    if (username !== user.username) {
      formData.append("username", username);
    }

    if (name !== user.name) {
      formData.append("name", name);
    }

    if (email !== user.email) {
      formData.append("email", email);
    }

    if (website !== user.website) {
      formData.append("name", website);
    }

    if (about !== user.about) {
      formData.append("about", about);
    }

    const res = await axios.post("http://127.0.0.1:8000/user/edit", formData);
    const data = res.data;

    if (data.status === "ok") {
      const userToChange = JSON.parse(localStorage.getItem("user")!);
      if (userToChange.username !== username) {
        userToChange.username = username;
        localStorage.setItem("user", JSON.stringify(userToChange));
      }

      dispatch(clearUser());
      dispatch(setAuthUser(userToChange));
      navigate(`/profile/${user.username}`);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <Avatar />
        <Input value={username} handler={setUsername} label="Имя пользователя" />
        <Input value={name} handler={setName} label="Имя" />
        <Input value={email} handler={setEmail} label="Электронный адрес" />
        <Input value={website} handler={setWebsite} label="Веб-сайт" />
        <Textarea value={about} handler={setAbout} label="Пара слов о себе" />
      </div>
      <div className={styles.footer}>
        <div
          className={submitButtonIsDisable ? styles.button_disable : styles.button}
          onClick={() => submit()}
        >Сохранить</div>
        <div className={styles.button_red}>Удалить аккаунт</div>
      </div>
    </div>
  );
}

export default ProfileEdit;
