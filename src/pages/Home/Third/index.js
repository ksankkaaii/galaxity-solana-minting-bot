import React from "react";

import { getImg, useResize } from "../../../utils/Helper";
import styles from './Third.module.scss';
import { Accordion } from "../../../components/Accordion";

const faqs = [
    { "title": "How can I read my book?", "content": "After minting your book, the ebook reader will be revealed.  Return at any time to continue reading your book." },
    {
        "title": "How can I claim my NFTBook for free ?", "content": "You must hold both the Golden Ticket and Relic to qualify for free minting.You only pay for gas. <br/><br/>Golden Ticket: <a href='https://opensea.io/collection/maskdao-golden-ticket' target='_blank'>https://opensea.io/collection/maskdao-golden-ticket</a> <br/>Relic: <a href='https://opensea.io/collection/maskdao-word-on-the-street' target='_blank'>https://opensea.io/collection/maskdao-word-on-the-street</a>"
    },
    { "title": "Why are my suggested eth gas fees outrageous?", "content": "Please refer to <a href='https://etherscan.io/gastracker' target='_blank'>https://etherscan.io/gastracker</a> to gauge what an appropriate fee would cost. If the suggested gas fee is more than what you would expect, then you should \"edit\" the fee to be lower and hit \"confirm\". The 2nd transaction will provide the actual cost for you to approve for minting." },
    { "title": "Can I download the PDF or Audiobook?", "content": "No, not at this time. The creators wished to protect their work from piracy, so content is only accessible to NFTBook owners through your Web3  browser." },
    { "title": "How can I access my content offline", "content": "Offline access is not supported at this time. In the future, you will have a mobile app to download your content securely to your devices for offline access." }
]

export const Third = () => {

    const { isMobile } = useResize()

    return (
        <div className={styles.home}>
            <div className={styles.third}>
                {!isMobile && <img className={styles.bg} src={getImg('home/third_bg.png')} alt="bg" />}
                {isMobile && <img className={styles.bg} src={getImg('home/third_bg_mob.png')} alt="bg" />}
                <div className="container">
                    <div className={styles.accordions}>
                        <h3>FAQ</h3>
                        {faqs.map((faq, index) => (
                            <Accordion obj={faq} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}