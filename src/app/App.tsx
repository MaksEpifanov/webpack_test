import { useState } from "react";
import styles from "./styles.m.scss";

export const App = () => {
  const [count, setCount] = useState(0);

  const onIncrement = () => setCount((prev) => prev + 1);
  const onDecrement = () => setCount((prev) => prev - 1);

  return (
    <div className={styles.btn}>
      <h1>{count}</h1>
      <button type="button" onClick={onIncrement}>
        <span>+</span>
      </button>
      <button type="button" onClick={onDecrement}>
        -
      </button>
    </div>
  );
};
