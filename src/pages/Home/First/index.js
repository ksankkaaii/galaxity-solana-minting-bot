import React, { useState, useEffect } from "react";
import axios from 'axios'

import { getImg, useResize } from "../../../utils/Helper";
import { accountAddress, chainId, customBookContract, goldenContract, relicContract } from "../../../utils/web3/Wallet";
import styles from "./First.module.scss";
import { TextBox } from "../../../components/TextBox";
import { CheckoutBox } from "../../../components/CheckoutBox";
import { ProgressModal } from "../../../components/ProgressModal";
import { PdfModal } from "../../../components/PdfModal";

const text = {
    "title": "The Mask of Ganymede",
    "content": "The Mask of Ganymede started with a Hashmask that evoked a name in its owner’s mind. “The Abduction of Ganymede” features a white eagle on a very dark blue figure with an orange background, all of which seem to have been inspired by the Greek mythology which gave us Ganymede and other colorful godly characters. A Jupiter glyph adorns the bottom right of the artwork, which informs a cautious viewer that the piece bears relation to Zeus or the Eagle. The first lore book for the Hashmasks world, The Mask of Ganymede is a triumphant tale of redemption, replete with a refreshing cast of characters and a clear goal: tell a true Greek epic in the technological world of today, based on Hashmasks and the technology that powers them.",
    "content_mob": "The Mask of Ganymede started with a Hashmask that evoked a name in its owner’s mind. “The Abduction of Ganymede” features a white eagle on a very dark blue figure with an orange background, all of which seem to have been inspired by the Greek..."
}

export const First = () => {

    const { isMobile } = useResize()
    const [golden, setGolden] = useState(0)
    const [relic, setRelic] = useState(0)
    const [activeMint, setActiveMint] = useState(true)
    const [minting, setMinting] = useState(false)
    const [minted, setMinted] = useState(false)
    const [totalSupply, setTotalSupply] = useState(0)
    const [ethPrice, setEthPrice] = useState(0)
    const [step, setStep] = useState('')
    const [uri, setUri] = useState('')
    let flag = false
    let relicId = false
    let tokenId = 0

    customBookContract?.methods.totalSupply().call().then((supply) => {
        setTotalSupply(supply)
    })

    const getEthPrice = () => {
        axios.get('https://api.coinbase.com/v2/prices/ETH-USD/spot').then((res) => {
            const price = res.data.data.amount
            setEthPrice(price)
        })
    }
    getEthPrice()

    setTimeout(getEthPrice, 5000)

    useEffect(() => {
        if (accountAddress === undefined) setMinted(false)
    }, [accountAddress])

    useEffect(() => {
        if (accountAddress) {
            try {
                relicContract.methods.balanceOf(accountAddress).call().then(res => {
                    setRelic(res)
                })
                goldenContract.methods.balanceOf(accountAddress).call().then(res => {
                    setGolden(res)
                })
            } catch (error) {
                console.log("error", error)
            }
        }
    })

    const checkNet = () => {
        if (!window.web3) {
            alert("Please install MetaMask!")
            return false
        } else if (!accountAddress) {
            alert('Please connect Metamask!')
            return false
        } else if (chainId !== 4) {  // main net = 1, rikeby net = 4
            alert('Please make sure you are in Ethereum Rinkeby Test Net')
            return false
        }
        return true
    }

    const onClickMint = async () => {

        if (checkNet()) {
            setActiveMint(false)
            try {
                customBookContract.methods.canClaim().call({
                    from: accountAddress
                }).then(res => {
                    flag = res[0]
                    relicId = res[1]
                    setActiveMint(true)
                    setMinting(true)
                    setStep('approve')

                    if (flag === false) {
                        customBookContract.methods.Mint().send({
                            from: accountAddress,
                            value: '60000000000000000'
                        }).on('transactionHash', function (hash) {
                            setStep('confirm')
                        }).on('confirmation', function (confirmationNumber, receipt) {
                            setStep('success')
                        }).on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                            console.log('error', error)
                            setMinting(false)
                        });
                    } else {
                        customBookContract.methods.claim(relicId).send({
                            from: accountAddress
                        }).on('transactionHash', function (hash) {
                            setStep('confirm')
                        }).on('confirmation', function (confirmationNumber, receipt) {
                            setStep('success')
                        }).on('error', function (error, receipt) { // If the transaction was rejected by the network with a receipt, the second parameter will be the receipt.
                            setMinting(false)
                        });
                    }
                })
            } catch (error) {
                console.log("error", error)
            }
        }
    }

    const onClickRead = () => {
        setMinting(false)
        setMinted(true)
    }

    const onClickUnlockToRead = () => {
        if (checkNet()) {
            try {
                customBookContract.methods.balanceOf(accountAddress).call().then((res) => {
                    if (res === 0) {
                        alert("You did not mint a NFT book. Please mint one.")
                    } else {
                        customBookContract.methods.tokenOfOwnerByIndex(accountAddress, 0).call().then((res) => {
                            tokenId = res
                            customBookContract.methods.tokenURI(tokenId).call().then((res) => {
                                setUri(res)
                                setMinted(true)
                            })
                        })
                    }
                })
            } catch (error) {
                console.log('error', error)
            }
        }
    }

    return (
        <div className={styles.home}>
            <div className={styles.first}>
                {!isMobile && <img className={styles.bg} src={getImg('home/press.png')} alt="press" />}
                {isMobile && <img className={styles.bg} src={getImg('home/press_mob.png')} alt="press" />}
                <div className="container">
                    <div className={styles.container}>
                        <div className={styles.text} >
                            <TextBox text={text} />
                            <div className={styles.icons}>
                                <div className={styles.icon}>
                                    <img src={getImg('icon/nft.png')} alt="nft" />
                                    <p>NFT</p>
                                </div>
                                <div className={styles.icon}>
                                    <img src={getImg('icon/pdf.png')} alt="pdf" />
                                    <p>eBook, PDF</p>
                                </div>
                                <div className={styles.icon}>
                                    <img src={getImg('icon/audio_book.png')} alt="audio_book" />
                                    <p>Audiobook</p>
                                </div>
                                <div className={styles.icon}>
                                    <img src={getImg('icon/demend.png')} alt="demend" />
                                    <p>Print-on-<br />demend</p>
                                </div>
                            </div>
                        </div>
                        <img className={styles.eagle} src={getImg('home/eagle.png')} alt="eagle" />
                        {minting && <ProgressModal step={step} onClick={onClickRead} />}
                        {!minted && <div className={styles.checkout}>
                            <CheckoutBox
                                golden={golden}
                                relic={relic}
                                onClickMint={onClickMint}
                                onClickUnlockToRead={onClickUnlockToRead}
                                active={activeMint} totalSupply={totalSupply} ethPrice={ethPrice} />
                        </div>}
                        {minted && <div className={styles.pdf}>
                            <PdfModal uri={uri} />
                        </div>}
                    </div>
                </div>
            </div >
        </div>
    )
}