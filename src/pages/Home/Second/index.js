import React from "react";

import { getImg, useResize } from "../../../utils/Helper";
import styles from './Second.module.scss';

export const Second = () => {

    const { isMobile } = useResize()

    return (
        <div className={styles.second}>
            {!isMobile && <img src={getImg('home/second_bg.png')} alt="second_bg" />}
            {isMobile && <img src={getImg('home/second_bg_mob.png')} alt="second_bg_mob" />}
            <div className="container">
                <div className={styles.why}>
                    <h3>Why press?</h3>
                    <div className={styles.second_box}>
                        <div className={styles.box}>
                            <h5>Collectable</h5>
                            <p>Own a verified copy of this book as an NFT. </p>
                        </div>
                        <div className={styles.box}>
                            <h5>One-of-a-Kind</h5>
                            <p>Each minted copy will be unique with your own signature on the front cover. (Coming soon!) </p>
                        </div>
                        <div className={styles.box}>
                            <h5>Rare</h5>
                            <p>Only 1024 NFTs will ever be made. </p>
                        </div>
                        <div className={styles.box}>
                            <h5>Protected</h5>
                            <p>Only you have access to read or listen to your book by connecting your wallet. </p>
                        </div>
                        <div className={styles.box}>
                            <h5>Printable</h5>
                            <p>Each unique copy will be available to purchase on hardback after pressing. </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}