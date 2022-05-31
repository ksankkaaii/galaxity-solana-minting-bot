import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';

import { initWallet, accountAddress } from "../../utils/web3/Wallet";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { First } from "./First";
import { Second } from "./Second";
import { Third } from "./Third";
import styles from './Home.module.scss';

const Home = ({ address }) => {

    const [account, setAccount] = useState("")

    const init = async () => {
        await initWallet()
        setAccount(accountAddress)
    }

    const handleSetAccount = () => {
        init()
    }

    useEffect(() => {
        if (localStorage.getItem("WEB3_CONNECT_CACHED_PROVIDER")) init()
        else setAccount("")
    }, [address])

    return (
        <div className={styles.home}>
            <Header account={account} handleClick={handleSetAccount} />
            <First />
            <Second />
            <Third />
            <Footer />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        address: state.wallet.address,
    }
}

export default connect(mapStateToProps)(Home);