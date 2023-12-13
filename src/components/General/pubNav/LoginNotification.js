import * as React from 'react';
import styles from './loginNotif.module.css';

const LoginNotification = () => {
    const [shouldAnimate, setShouldAnimate] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShouldAnimate(true);
        }, 3000); // Delay of 3 seconds

        return () => clearTimeout(timer);
    }, []);

    if (!shouldAnimate) return null;

    return (
        <div className={styles.container}>
            <p className={styles.text}>TCE Employee? Log in here to access tools.</p>
            <button className={styles.button}>Hide</button>
        </div>
    );
}

export default LoginNotification;
