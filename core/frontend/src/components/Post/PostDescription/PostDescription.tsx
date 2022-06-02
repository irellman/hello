import styles from "./PostDescription.module.scss";
import {FC, useMemo, useState} from "react";

interface props {
  rawDescription: string
}

const PostDescription: FC<props> = ({ rawDescription }) => {
  const [descriptionIsFull, setDescriptionIsFull] = useState<boolean>(false);

  const description: string = useMemo(() => {
    if (descriptionIsFull) {
      return rawDescription;
    }

    if (rawDescription.length !== 0) {
      const newLineIndex = rawDescription.indexOf('\r\n');

      if (newLineIndex !== -1) {
        return rawDescription.slice(0, newLineIndex);
      }

      return rawDescription.slice(0, 80);
    } else {
      return "";
    }
  }, [rawDescription, descriptionIsFull])

  return (
    description.length !== 0 ?
      <>
        {description.length !== 0 &&
          <div className={styles.description}>
            {description}
            {!descriptionIsFull &&
              <>
                {description.length < 80 ? "" : "..."}
                  <div className={styles.more} onClick={() => setDescriptionIsFull(true)}>Ещё</div>
              </>
            }
          </div>
        }
      </>
    :
      <></>
  );
}

export default PostDescription;
