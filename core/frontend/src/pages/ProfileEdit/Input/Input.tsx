import React, {FC} from "react";
import styles from "./Input.module.scss";

interface props {
  value: string,
  handler: (value: string) => void,
  label: string
}

const Input: FC<props> = ({ value, handler, label }) => {
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handler(e.target.value);
  }

  return (
    <div className={styles.block}>
      <div className={styles.label}>{label}</div>
      <input
        className={styles.input}
        value={value}
        onChange={onChange}
        placeholder={label}
      />
    </div>
  )
}

export default Input;
