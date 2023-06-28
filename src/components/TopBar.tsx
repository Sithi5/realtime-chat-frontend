import React from 'react';
import styles from './Topbar.module.css';

const Topbar = () => {
  return (
    <div className={styles.topbar}>
      <h1 className={styles.topbar__title}>ChatRoom</h1>
    </div>
  );
};

export default Topbar;
