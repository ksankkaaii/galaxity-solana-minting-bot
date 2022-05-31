import React, { useEffect } from 'react'

import styles from './PdfModal.module.scss'

export const PdfModal = (props) => {

    console.log('uri', props.uri)
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "./dflip/js/dflip.min.js";
        script.async = true;

        document.body.appendChild(script);
    }, [])

    return (
        <div className={styles.div}>
            <h6>Wallet connected. Have a great read.</h6>
            <div>
                <div className="_df_book" webgl="true" backgroundcolor="#C1C1C1" minwidth="auto"
                    source="https://wippbooks.mypinata.cloud/ipfs/bafybeia3pqdaiin4a5mjnrajlfqhlleqnfzildg5k4y2sl35vchnijg574?accessToken=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbmRleGVzIjpbImY4NGQwOGE5ZDc5ZmYwZmNkOWNiNWJmZTU2ZTBhNmY0Il0sImFjY291bnRJZCI6Ijc5ZjI3ZWZlLTg3M2QtNGE1OS05ZTYwLWI5ZDJlN2RmNTgwNCIsImlhdCI6MTYzNzk4NDAzMywiZXhwIjoxNjQzMjQ0MjA5fQ.i4pPmYFrOXKaJ1KqIchPQvxXTmi2RASfPvhIS9MSatQ"
                >
                </div>
            </div>
        </div>
    )
}