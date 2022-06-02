import React from "react";
import { Navigate, Route, Routes } from 'react-router-dom'
import styles from "./Auth.module.scss";

const Login = React.lazy(() => import("./Login"));
const Signup = React.lazy(() => import("./Singup"));

const Auth = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/auth/signup" />} />
        </Routes>
      </div>
    </div>
  )
}

export default Auth
