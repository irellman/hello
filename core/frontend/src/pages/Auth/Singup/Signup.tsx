import { useEffect, useMemo, useState } from "react";
import { signup } from "api/user";
import Input from "components/Input";
import styles from "../Auth.module.scss";
import {Link} from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirmation, setPasswordConfirmation] = useState("")
  const [verifyEmail, setVerifyEmail] = useState(false)

  const submitButtonIsDisable = useMemo(() => {
    if (email && username && password && passwordConfirmation && password === passwordConfirmation) {
      return false
    }

    return true
  }, [email, username, password, passwordConfirmation])

  async function submit() {
    if (submitButtonIsDisable) {
      return
    }

    const res = await signup(username, email, password, passwordConfirmation)
    
    if(res.data.success) {
      setVerifyEmail(true)
    }
  }

  useEffect(() => {
    document.title = "Регистрация • Instagram"
  }, [])

  return (
    verifyEmail === false ?
      <div>
        <div className={styles.title}>Регистрация</div>
        <div className={styles.signup}>
          <Input
            value={email}
            onChange={setEmail}
            label="Адрес электронной почты"
            type="email"
            name="email"
          />
          <Input
            value={username}
            onChange={setUsername}
            label="Имя пользователя"
            type="text"
            name="username"
          />
          <Input
            value={password}
            onChange={setPassword}
            label="Пароль"
            type="password"
            name="password"
          />
          <Input
            value={passwordConfirmation}
            onChange={setPasswordConfirmation}
            label="Подтверждение пароля"
            type="password"
            name="passwordConfirmation"
          />
          <div className={submitButtonIsDisable ? styles.button_disable : styles.button} onClick={() => submit()}>Зарегистрироваться</div>
        </div>
        <div className={styles.or}>Или</div>
        <div className={styles.footer}>Уже есть аккаунт? <Link className={styles.link} to="/auth/login">Войдите</Link>!</div>
      </div>
    :
      <div>Мы отправили письмо на ваш электронный адрес! Пройдите по ссылке в нём, чтобы активировать ваш аккаунт!</div>
  )
}

export default Signup
