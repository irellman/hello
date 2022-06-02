import styles from "./PostsHeader.module.scss";
import {faArrowLeft, faEllipsis} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {FC} from "react";
import {Link, useParams} from "react-router-dom";

interface props {
  collectionName: string,
  setModalName: (value: string) => void
}

const PostsHeader: FC<props> = ({collectionName, setModalName}) => {
  const params = useParams();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link
          to="/saved"
          className={styles.back}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <div className={styles.title}>{collectionName}</div>
        {params.id !== "all-posts" &&
          <div
            className={styles.options}
            onClick={() => setModalName("MainModal")}
          >
            <FontAwesomeIcon icon={faEllipsis} />
          </div>
        }
      </div>
    </div>
  );
}

export default PostsHeader;
