import { SignUpButton } from "@src/components/auth0/signUpButton";

import styles from "./styles.module.scss";

const HeroMain = () => {
  return (
    <div className={styles.heroMain}>
      <div className={styles.container}>
        <div className={styles.contentWrapper}>
          <h1>
            Busy? <br />
            <span>Never</span> miss a surf session again...
          </h1>
          <p>
            SurfSentry allows you to get on with things without focusing on the
            surf reports
          </p>
          <div className={styles.buttonWrapper}>
            <SignUpButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroMain;
