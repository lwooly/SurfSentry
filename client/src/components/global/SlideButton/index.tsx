import React, { FC } from "react";

import styles from "./styles.module.scss";

interface Props {
  handleClick?: () => void;
  children: React.ReactNode;
}

const SlideButton: FC<Props> = ({ children, ...props }) => {
  return (
    <button className={styles.slideButton} {...props}>
      <div className={styles.contentWrapper}>{children}</div>
      <div className={styles.hoverCircle}>
        <img src="/src/assets/images/icons/btnArrow.svg" alt="" />
      </div>
    </button>
  );
};

export default SlideButton;
