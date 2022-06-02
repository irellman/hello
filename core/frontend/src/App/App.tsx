import Header from 'components/Header'
import Router from 'router'
import { useEffect } from 'react'
import {useAppDispatch, useAppSelector} from 'hooks/redux'
import {getAuthUser} from "api/user";
import {authReducer} from "context/auth/reducer";
import styles from "./App.module.scss";
import {appReducer} from "context/appReducer/reducer";
import DesktopHeader from "components/Header/DesktopHeader/DesktopHeader";
import MobileNav from "components/MobileNav";

const App = () => {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(state => state.authReducer.isAuth);
  const windowWidth = useAppSelector(state => state.appReducer.width);

  const { setAuthUser, clearAuthUser } = authReducer.actions;
  const { setWidth } = appReducer.actions;

  useEffect(() => {
    async function auth () {
      const res = await getAuthUser();
      const data = res.data;

      if (data.status) {
        dispatch(clearAuthUser());
        localStorage.removeItem("user");
      } else {
        dispatch(setAuthUser(data));
        localStorage.setItem("user", JSON.stringify(data));
      }
    }

    // auth();
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      dispatch(setWidth(document.body.offsetWidth));
    });
  }, []);

  return (
    isAuth !== null ?
      <>
        {windowWidth >= 640 &&
          <Header>
            <DesktopHeader />
          </Header>
        }
        <div className={styles.page}>
          <Router />
        </div>
        {windowWidth < 640 &&
          <MobileNav />
        }
      </>
    :
      <></>
  );
}

export default App;
