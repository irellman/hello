import React, {FC} from "react";
import styles from "./Textarea.module.scss";

interface props {
  value: string,
  handler: (value: string) => void,
  label: string
}

const Textarea: FC<props>  = ({ value, handler, label }) => {
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    handler(e.target.value);
  }

  return (
    <div className={styles.block}>
      <div className={styles.label}>О себе</div>
      <textarea
        className={styles.textarea}
        value={value}
        onChange={onChange}
        placeholder="Пара слов о себе"
      />
    </div>
  )
}

export default Textarea;
