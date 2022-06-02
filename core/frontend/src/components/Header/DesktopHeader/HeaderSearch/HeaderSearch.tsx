import React, { FC, useEffect, useRef, useState } from "react";
import SearchIcon from "components/icons/SearchIcon";
import {CrossIcon} from "components/icons/CrossIcon";
import styles from "./HeaderSearch.module.scss";

const HeaderSearchDropdown = React.lazy(() => import("../HeaderSearchDropdown"));

const HeaderSearch: FC = () => {
  const [search, setSearch] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const container = useRef<any>();
  const input = useRef<any>();

  const clickHandler = (target: EventTarget) => {
    const el: Element = target as Element;
    const className = container.current.classList.value;

    if (!el.closest(`.${className}`)) {
      setIsFocused(false);
      input.current.blur();
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", (e) => clickHandler(e.target!));
  }, []);

  return (
    <div
      className={styles.search}
      ref={container}
    >
      <input
        className={styles.input}
        type="text"
        value={search}
        placeholder="Поиск"
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        ref={input}
      />
      {!isFocused &&
        <div className={styles.wrapper}>
          <SearchIcon
            size={16}
            color="rgb(140, 140, 140)"
          />
          <div className={styles.placeholder}>{search || "Поиск"}</div>
        </div>
      }
      {isFocused && search.length > 0 &&
        <CrossIcon
          className={styles.icon}
          size={12}
          color="rgb(160, 160, 160)"
          onClick={() => {setSearch("")}}
        />
      }
      <HeaderSearchDropdown
        query={search}
        isActive={isFocused}
        setIsFocused={setIsFocused}
      />
    </div>
  );
}

export default HeaderSearch;
