import React, { useState } from 'react';
import { useAppDispatch } from '../redux_toolkit/hooks';
import Topbar from '../components/TopBar';
import styles from './LoginPage.module.css';
import { signInUser } from '../redux_toolkit/userSlice';

const LoginPage = () => {
  const dispatch = useAppDispatch();

  const handleConnectMalo = () => {
    dispatch(signInUser('Malo'));
  };

  const handleConnectTom = () => {
    dispatch(signInUser('Tom'));
  };

  return (
    <div>
      <Topbar />
      <div className={styles.button_container}>
        <button className={styles.connect_button} onClick={handleConnectMalo}>
          Connect Malo
        </button>
        <button className={styles.connect_button} onClick={handleConnectTom}>
          Connect Tom
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
