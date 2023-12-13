import * as React from 'react';
import styles from './loginNotif.module.css';

const LoginNotification = () => {
    const [isVisible, setIsVisible] = React.useState(true); // Step 2

    const hideContainer = () => {
        setIsVisible(false); // Step 3
    }

    if (!isVisible) return null; // Step 4

    return (
        <div className={styles.container}>
            <p className={styles.text}>TCE Employee? Log in here to access tools.</p>
            <button className={styles.button} onClick={hideContainer}>Hide</button> {/* Step 3 */}
        </div>
    );
}

export default LoginNotification;
