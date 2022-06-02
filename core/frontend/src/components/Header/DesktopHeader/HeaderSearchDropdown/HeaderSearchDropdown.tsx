import { searchUsersOrTags } from "api/app";
import HeaderSearchDropdownItem from "../HeaderSearchDropdownItem";
import { LoaderIcon } from "components/icons/LoaderIcon";
import { recentSearchReducer } from "context/recentSearchReducer";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import { FC, useEffect, useState } from "react";

import styles from "./HeaderSearchDropdown.module.scss";
import axios from "axios";
import {FetchToClearRecentSearch} from "api/recentSearch";

interface recentSearch {
  image: string,
  title: string,
  subtitle: string
}

interface props {
  query: string,
  isActive: boolean,
  setIsFocused: (value: boolean) => void
}

const HeaderSearchDropdown: FC<props> = ({ query, isActive, setIsFocused }) => {
  const recentSearches = useAppSelector(state => state.recentSearchReducer);
  const [result, setResult] = useState<recentSearch[]>([]);
  const [searchTimeout, setSearchTimeout] = useState<any>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const { setRecentSearches, clearRecentSearches } = recentSearchReducer.actions;
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getRecentSearches() {
      const formData = new FormData();
      const res = await axios.post("http://127.0.0.1:8000/api/recent_searches/get", formData);
      const data = res.data;

      if (!data.status) {
        dispatch(setRecentSearches(data));
      }
    }

    getRecentSearches();
  }, []);

  useEffect(() => {
    if (query) {
      search();
    } else {
      setResult([]);
    }
  }, [query]);

  const search = async () => {
    setIsFetching(true);
    clearTimeout(searchTimeout);

    setSearchTimeout(setTimeout(async () => {
      const res = await searchUsersOrTags(query);
      setResult(res.data);
      setIsFetching(false);
    }, 500));
  }

  const clear = () => {
    FetchToClearRecentSearch();
    dispatch(clearRecentSearches());
  }

  return (
    <div className={isActive ? styles.dropdown_active : styles.dropdown}>
      {!query &&
        <div className={styles.header}>
          <div className={styles.title}>Недавние</div>
          {recentSearches.length ?
            <div className={styles.clear} onClick={() => clear()}>Очистить</div>
            :
            <></>
          }
        </div>
      }
      <div className={styles.list}>
        {!isFetching ?
          query.length ?
            result.length ?
              result.map((item: recentSearch, index: number) => {
                return (
                  <HeaderSearchDropdownItem
                    image={item.image}
                    title={item.title}
                    subtitle={item.subtitle}
                    canRemove={false}
                    setIsFocused={setIsFocused}
                    key={index}
                  />
                );
              })
              :
              <div className={styles.label}>Ничего не найдено</div>
            :
            recentSearches.length ?
              recentSearches.map((item: recentSearch, index: number) => {
                return (
                  <HeaderSearchDropdownItem
                    image={item.image}
                    title={item.title}
                    subtitle={item.subtitle}
                    setIsFocused={setIsFocused}
                    canRemove
                    key={index}
                  />
                );
              })
            :
            <div className={styles.label}>Нет недавних запросов</div>
          :
          <div className={styles.label}>
            <LoaderIcon />
          </div>
        }
      </div>
    </div>
  );
}

export default HeaderSearchDropdown;
