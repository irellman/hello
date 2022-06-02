import { FC } from "react";
import { CrossIcon } from "components/icons/CrossIcon";
import styles from "./HeaderSearchDropdownItem.module.scss";
import { useNavigate } from "react-router-dom";
import { FetchToAddRecentSearch, FetchToDeleteRecentSearch, FetchToUpdateRecentSearches } from "api/recentSearch";
import {useAppDispatch, useAppSelector} from "hooks/redux";
import {recentSearchReducer} from "context/recentSearchReducer";

interface props {
  image: string,
  title: string,
  subtitle: string,
  canRemove: boolean,
  setIsFocused: (value: boolean) => void
}

export const HeaderSearchDropdownItem: FC<props> = ({ image, title, subtitle, canRemove, setIsFocused }) => {
  const recentSearches = useAppSelector(state => state.recentSearchReducer);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { updateRecentSearches, addRecentSearch, deleteRecentSearch } = recentSearchReducer.actions;

  const addAndNavigate = (value: string) => {
    setIsFocused(false);
    
    if (value[0] === "#") {
      navigate(`/explore?tag=${value.replace("#", "")}`);
    } else {
      navigate(`/profile/${value}`);
    }

    if (recentSearches.find((item: any) => {return item.title === value})) {
      FetchToUpdateRecentSearches(value);
      setTimeout(() => {
        dispatch(updateRecentSearches(value));
      }, 250)
    } else {
      dispatch(addRecentSearch({image: image, title: title, subtitle: subtitle}));
      FetchToAddRecentSearch(value);
    }
  }

  const remove = (e: MouseEvent, value: string) => {
    e.stopPropagation();
    FetchToDeleteRecentSearch(value);
    dispatch(deleteRecentSearch(value));
  }

  return (
    <div className={styles.item} onClick={() => addAndNavigate(title)}>
      <div className={styles.image} style={{backgroundImage: `url(http://127.0.0.1:8000${image})`}} />
      <div className={styles.info}>
        <div className={styles.title}>{title}</div>
        <div className={styles.subtitle}>{subtitle}</div>
      </div>
      {canRemove &&
        <CrossIcon
          size={16}
          color={"rgb(140, 140, 140)"}
          onClick={(e: MouseEvent) => remove(e, title)}
        />
      }
    </div>
  );
}

export default HeaderSearchDropdownItem;
