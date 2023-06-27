import React from "react";
import styles from './MyModal.module.css'

export const MyModal = ({children, visible, setVisible}) => {

    const rootClasses = [styles.myModal];
    if (visible)
        rootClasses.push(styles.active)

    return (
        <div className={rootClasses.join(' ')}>
            <div className={styles.myModalContent}>
                {children}
            </div>
        </div>
    )
}