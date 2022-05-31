import React from 'react'

import styles from './ProgressModal.module.scss'
import { getImg, useResize } from '../../utils/Helper'
import { Button } from '../Button'

export const ProgressModal = (props) => {

    const { isMobile } = useResize()
    const buttonWidth = isMobile ? 217 : 378
    const checkImg = getImg('icon/check.png')
    const checkedImg = getImg('icon/checked.png')
    let approveIcon = null;
    let confirmIcon = null;
    let successIcon = null;

    if (props.step === 'approve') {
        approveIcon = checkedImg;
        confirmIcon = checkImg;
        successIcon = checkImg;
    } else if (props.step === 'confirm') {
        approveIcon = checkedImg;
        confirmIcon = checkedImg;
        successIcon = checkImg;
    } else if (props.step === 'success') {
        approveIcon = checkedImg;
        confirmIcon = checkedImg;
        successIcon = checkedImg;
    }

    return (
        <div className={styles.div}>
            <div className={styles.modal} style={props.style}>
                <h6>Let’s press this book, shall we?</h6>
                <div className={styles.steps}>
                    <div className={styles.step}>
                        <img src={approveIcon} alt="icon" />
                        <div>
                            <h5>Approve</h5>
                        </div>
                    </div>
                    <div className={styles.step}>
                        <img src={confirmIcon} alt="icon" />
                        <div>
                            <h5>Confirm</h5>
                        </div>
                    </div>
                    <div className={styles.step}>
                        <img src={successIcon} alt="icon" />
                        <div>
                            <h5>Success</h5>
                        </div>
                    </div>
                    {(props.step !== 'success') && <Button value="Read" style={{ width: buttonWidth, height: 56 }} active disabled />}
                    {(props.step === 'success') && <Button value="Read" style={{ width: buttonWidth, height: 56 }} onClick={props.onClick} active />}
                </div>
            </div>
        </div>
    )
}