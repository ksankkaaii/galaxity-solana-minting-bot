import React from "react";

import { getImg, useResize } from "../../utils/Helper";
import styles from './Header.module.scss';
import { Button } from "../Button";

export const Header = (props) => {

    const { isMobile } = useResize()

    return (
        <header>
            <div className="container">
                <div className={styles.div}>
                    <div>
                        <img src={getImg('icon/logo.png')} alt="logo" />
                        <h6>NFTBOOK BAZAAR</h6>
                    </div>
                    {!isMobile && <Button
                        value={props.account ? props.account.substr(0, 5) + '...' + props.account.substr(38, 42) : "Connect"}
                        style={{ width: 140, height: 56 }} white
                        onClick={props.handleClick} />}
                    {isMobile && (props.account ? <Button
                        value={props.account.substr(0, 5) + '...' + props.account.substr(38, 42)}
                        style={{ width: 100, height: 30, fontSize: 12 }} white /> :
                        <img src={getImg('icon/wallet.png')} onClick={props.handleClick} alt="wallet" />)}
                </div>
            </div>
        </header>
    )
}