import React, { useState } from "react";

import { getImg, useResize } from "../../utils/Helper";
import styles from './CheckoutBox.module.scss'
import { Button } from "../Button";

export const CheckoutBox = (props) => {

    const { isMobile } = useResize()
    const buttonHeight = isMobile ? 46 : 72;
    const [showToolTip, setShowToolTip] = useState(false)
    let title = ''
    let goldenStatus = ''
    let relicStatus = ''

    if (props.golden == 0 && props.relic == 0) {
        title = "Your price to mint is .06ETH."
        goldenStatus = `<img src=` + getImg('icon/cut.png') + ` /> <a href="https://opensea.io/collection/maskdao-golden-ticket" target="_blank">Buy Now</a>`
        relicStatus = `<img src=` + getImg('icon/cut.png') + ` /> <a href="https://opensea.io/collection/maskdao-word-on-the-street" target="_blank">Buy Now</a>`
    } else if (props.golden == 0) {
        title = "Golden ticket is missing. Let’s get the special pass."
        goldenStatus = `<img src=` + getImg('icon/cut.png') + ` /> <a href="https://opensea.io/collection/maskdao-golden-ticket" target="_blank">Buy Now</a>`
        relicStatus = `<img src=` + getImg('icon/checkbox.png') + ` /> ${props.relic}`
    } else if (props.relic == 0) {
        title = "Relic is missing. Let’s get the special pass."
        goldenStatus = `<img src=` + getImg('icon/checkbox.png') + ` /> ${props.golden}`
        relicStatus = `<img src=` + getImg('icon/cut.png') + ` /> <a href="https://opensea.io/collection/maskdao-word-on-the-street" target="_blank">Buy Now</a>`
    } else {
        title = "Congratulations! You are eligible to claim for free."
        goldenStatus = `<img src=` + getImg('icon/checkbox.png') + ` /> ${props.golden}`
        relicStatus = `<img src=` + getImg('icon/checkbox.png') + ` /> ${props.relic}`
    }

    const hanleMouseOver = () => {
        setShowToolTip(true)
    }

    const handleMouseLeave = () => {
        setShowToolTip(false)
    }

    return (
        <div className={styles.div}>
            <div className={styles.claim}>
                <img src={getImg('icon/mask.png')} alt="mask" />
                <div className={styles.right}>
                    <div>
                        <div className={styles.text}>
                            {title}
                        </div>
                        <img src={getImg('icon/info.png')} onMouseOver={hanleMouseOver} onMouseLeave={() => handleMouseLeave()} alt="info" />
                        {showToolTip && <div className={styles.tooltip}>
                            Our initial free-minting launch is only available to MaskDAO members who hold both a Golden Ticket and a Relic.
                        </div>}
                    </div>
                    <div className={styles.tokens}>
                        <div className={styles.token}>
                            <span>Golden Ticket </span>
                            <span dangerouslySetInnerHTML={{ __html: goldenStatus }} />
                        </div>
                        <div className={styles.divider}>|</div>
                        <div className={styles.token}>
                            <span>Relic </span>
                            <span dangerouslySetInnerHTML={{ __html: relicStatus }} />
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.title}>
                <div>0.06 ETH </div> <p> ${(props.ethPrice * 0.06).toFixed(2)}</p>
            </div>
            <div className={styles.copy}>
                <img src={getImg('icon/copy.png')} alt="copy" />
                <label>Copies</label>
                <p>{1024 - props.totalSupply} <span>/ 1024</span></p>
            </div>
            {props.active && <Button value="Mint" style={{ width: '100%', height: buttonHeight }} onClick={props.onClickMint} active />}
            {!props.active && <Button value="Mint" style={{ width: '100%', height: buttonHeight }} active disabled />}
            <div className={styles.read}>
                <a href="https://wippbooks.mypinata.cloud/ipfs/QmVrVf7VT7aKRXas5LskDbiHVCRpz3RcrJHn8ppkxYk5jd/web/viewer.html"
                    target="_blank" >Read sample</a>
            </div>
            <hr />
            <h6>Already own this book?</h6>
            <Button value="Unlock to read" onClick={props.onClickUnlockToRead} style={{ width: '100%', height: 46 }} pink />
        </div>
    )
}