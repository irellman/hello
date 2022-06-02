import React, {FC} from "react";
import {Link} from "react-router-dom";
import {useAppSelector} from "hooks/redux";
import styles from "./Collections.module.scss";

const Collections: FC = () => {
  const collections = useAppSelector(state => state.collectionsReducer);

  return (
    <div className={styles.collections}>
      {collections.map((collection: any, index: number) => {
        return (
          <div
            className={styles.collection}
            style={{backgroundImage: `url(http://127.0.0.1:8000${collection.image})`}}
            key={index}
          >
            <Link
              className={styles.overlay}
              to={`/saved/${collection.id === 0 ? "all-posts" : collection.id}`}
            >
              <div className={styles.name}>{collection.name}</div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Collections;
