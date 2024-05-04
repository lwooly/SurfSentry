import React, { FC } from "react";

import styles from "./styles.module.scss";

type ButtonProps = React.ComponentProps<'button'>

interface SlideButtonProps extends ButtonProps {
  isBlue?:boolean;
}

const SlideButton: FC<SlideButtonProps> = ({ children, isBlue, ...props }) => {
  return (
    <button className={`${styles.slideButton} ${isBlue ? styles.isBlue : ''}`} {...props}>
      <div className={styles.contentWrapper}>{children}</div>
      <div className={styles.hoverCircle}>
        <img src="/src/assets/images/icons/btnArrow.svg" alt="" className={styles.arrow}/>
      </div>
    </button>
  );
};

export default SlideButton;
