import React, { useState } from 'react';
import { useAppDispatch } from '../redux_toolkit/hooks';
import Topbar from '../components/TopBar';
import styles from './LoginPage.module.css';
import { signInUser } from '../redux_toolkit/userSlice';

const LoginPage = () => {
  const dispatch = useAppDispatch();

  async function handleConnectUser(args: { email: string; password: string }) {
    const { email, password } = args;
    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;
        dispatch(signInUser({ email: email, accessToken: accessToken }));
      } else {
        console.error('Error connecting user:', response.statusText);
      }
    } catch (error) {
      console.error('Error connecting user:', error);
    }
  }

  return (
    <div>
      <Topbar />
      <div className={styles.button_container}>
        <button
          className={styles.connect_button}
          onClick={() => {
            handleConnectUser({
              email: 'malo@gmail.com',
              password: 'qwerty12345',
            });
          }}
        >
          Connect Malo
        </button>
        <button
          className={styles.connect_button}
          onClick={() => {
            handleConnectUser({
              email: 'tom@gmail.com',
              password: 'qwerty12345',
            });
          }}
        >
          Connect Tom
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
