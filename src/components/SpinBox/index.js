import React, { useState } from "react";

import styles from './SpinBox.module.scss'

export const SpinBox = () => {

    const [count, setCount] = useState(1)

    const onClickPlus = () => {
        setCount(count + 1)
    }

    const onClickMinus = () => {
        if (count === 1) return
        setCount(count - 1)
    }

    return (
        <div className={styles.div}>
            <div onClick={onClickMinus}>-</div>
            <span>{count}</span>
            <div onClick={onClickPlus}>+</div>
        </div>
    )
}