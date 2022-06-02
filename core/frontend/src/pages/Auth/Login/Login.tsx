import axios from "axios"
import { useEffect, useMemo, useState } from "react"
import {Link, useSearchParams} from "react-router-dom"
import { authReducer } from "context/auth/reducer"
import Input from "components/Input"
import {login} from "api/user";
import {useAppDispatch} from "hooks/redux";
import styles from "../Auth.module.scss";

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [searchParams] = useSearchParams();
  const { setAuthUser } = authReducer.actions;
  const dispatch = useAppDispatch();

  const submitButtonIsDisable = useMemo(() => {
    return !(email && password);
  }, [email, password])

  async function submit() {
    if (submitButtonIsDisable) {
      return;
    }

    const res = await login(email, password);
    const data = res.data;

    if (!data.message) {
      dispatch(setAuthUser(data));
      localStorage.setItem("user", JSON.stringify(data));
    } else {

    }
  }

  useEffect(() => {
    const uid = searchParams.get('uid'),
          token = searchParams.get('token')

    if(uid && token) {
      verify(uid, token)
    }
    document.title = "Войти • Instagram"
  }, []);

  async function verify(uid: string, token: string) {
    const res = await axios.post(`http://127.0.0.1:8000/user/verification/${uid}/${token}`)
    
    if(res.data.success) {

    } else {

    }
  }

  return (
    <div>
      <div className={styles.title}>Вход</div>
      <div className={styles.login}>
        <Input
          value={email}
          onChange={setEmail}
          label="Адрес электронной почты"
          type="email"
          name="email"
        />
        <Input
          value={password}
          onChange={setPassword}
          label="Пароль"
          type="password"
          name="password"
        />
        <div className={submitButtonIsDisable ? styles.button_disable : styles.button} onClick={() => submit()}>Войти</div>
      </div>
      <div className={styles.or}>Или</div>
      <div className={styles.footer}>Нет аккаунта? <Link className={styles.link} to="/auth/signup">Зарегестрируйтесь</Link>!</div>
    </div>
  );
}

export default Login;
