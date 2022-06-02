import { useEffect, useRef, useState } from "react";
import styles from "./Input.module.scss";

interface props {
  value: string,
  onChange: (value: string) => void,
  label: string,
  type: string,
  name: string
}

const Input = ({ value, onChange, label, type, name }: props) => {
  const [inputIsActive, setInputIsActive] = useState(false);
  const input = useRef<any>(null);

  useEffect(() => {
    if(input && inputIsActive) {
      input.current?.focus();
      input.current.hasAttribute('readonly') && input.current.removeAttribute('readonly');
    }
  }, [inputIsActive]);

  function unFocus(): void {
    if (!value) {
      setInputIsActive(false);
    }
  }

  useEffect(() => {
    input.current.removeAttribute('readonly')
  }, []);

  return (
    <div className={styles.container} onClick={() => setInputIsActive(true)}>
      <div className={!!value ? styles.label_small : styles.label}>{label}</div>
      <input
        className={!!value ? styles.field_small : styles.field}
        type={type}
        value={value}
        name={name}
        onChange={(e) => onChange(e.target.value)}
        ref={input}
        readOnly
        autoComplete="off"
        onBlur={() => unFocus()}
      />
    </div>
  );
}

export default Input;
