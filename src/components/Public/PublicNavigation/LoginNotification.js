import React, { useState, useEffect } from 'react';
import styles from './loginNotif.module.css';
import Box from '@mui/material/Box';

const LoginNotification = () => {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setShouldAnimate(true);
    }, 3000);

    const hideTimer = setTimeout(() => {
      hideNotification();
    }, 20000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  const hideNotification = () => {
    setIsVisible(false);
  };

  if (!shouldAnimate || !isVisible) return null;

  return (
    <Box className={styles.container}>
      <p className={styles.text}>TCE Employee? Sign in here to access your Toolbox.</p>
      <button className={styles.button} onClick={hideNotification}>Hide</button>
    </Box>
  );
};

export default LoginNotification;
