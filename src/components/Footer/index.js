import React from "react";

import { getImg, useResize } from "../../utils/Helper";
import styles from './Footer.module.scss'
import { Button } from "../Button";

export const Footer = () => {

    const { isMobile } = useResize()

    return (
        <footer>
            <div className="container">
                <div className={styles.div}>
                    {isMobile && <div className={styles.center}>
                        <img src={getImg('icon/logo_footer_mob.png')} alt="logo_footer_mob" />
                        <div> NFTBOOK<br />BAZAAR </div>
                        <p>Made with ❤️️ by PageDAO.</p>
                    </div>}
                    <div className={styles.container}>
                        <div className={styles.left}>
                            <a href="https://twitter.com/page_dao" target="_blank">
                                <img src={getImg('icon/twitter.png')} alt="twiter" />
                            </a>
                            <a href="https://discord.gg/fHPc9nVb3V " target="_blank">
                                <img src={getImg('icon/discord.png')} alt="discord" />
                            </a>
                        </div>
                        {!isMobile && <div className={styles.center}>
                            {!isMobile && <img src={getImg('icon/logo_footer.png')} alt="logo_footer" />}
                            <div> NFTBOOK<br />BAZAAR </div>
                            <p>Made with ❤️️ by PageDAO.</p>
                        </div>}
                        <div className={styles.right}>
                            <a href="https://airtable.com/shrJK1rhSTaNWHwId" target="_blank">
                                <Button value="Join as writer &nbsp;" style={{ width: 174, height: 42, fontSize: 16 }} src={getImg('icon/join.png')} white />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}