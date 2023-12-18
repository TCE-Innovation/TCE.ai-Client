import * as React from 'react';
import styles from './loginNotif.module.css';

const LoginNotification = () => {
    const [shouldAnimate, setShouldAnimate] = React.useState(false);
    const [isVisible, setIsVisible] = React.useState(true); // New state to control visibility

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setShouldAnimate(true);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    const hideNotification = () => {
        setIsVisible(false); // Function to hide the notification
    };

    if (!shouldAnimate || !isVisible) return null; // Check both animation and visibility states

    return (
        <div className={styles.container}>
            <p className={styles.text}>TCE Employee? Log in here to access tools.</p>
            <button className={styles.button} onClick={hideNotification}>Hide</button> {/* Add onClick handler */}
        </div>
    );
}

export default LoginNotification;
