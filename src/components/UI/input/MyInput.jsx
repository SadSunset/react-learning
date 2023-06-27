import React from "react";
import styles from './MyInput.module.css'

export const MyInput = React.forwardRef((props, ref) => {

    return (
        <input ref={ref} className={styles.MyInput} {...props}/>
    )
})