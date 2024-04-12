import React, { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  handleClick?: () => void;
  children: React.ReactNode;
}

const ButtonWithArrow: FC<Props> = ({ handleClick, children }) => {
  return (
    <button onClick={handleClick} className={styles.buttonWithArrow}>
      {children}
    </button>
  );
};

export default ButtonWithArrow;
