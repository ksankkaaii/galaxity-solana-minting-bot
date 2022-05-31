import { clearWalletProvider, connectToWallet, web3ModalProvider } from "./Web3Modal";
import { CHANGE_WALLET } from '../../actions/types';

import store from '../../store'
import CustomNFTBookAbi from '../../abi/CustomNFTBook.json'
import RelicAbi from '../../abi/Relic.json'
import GoldenAbi from '../../abi/Golden.json'
// const CustomBookAddres = "0x275b5daA1509Ab9a77690171A5edCf1a671A15f7"; // mainnet
const CustomBookAddres = "0x3Be9b1Cf2bD4D5d62877F9A6cF03C89ff6e7cB53"; // rikeby
const RelicAddress = "0xE4aff8c353910061b0C0cb4f52622399C5cAf68a"
const GoldenAddress = "0xba5D6fd0B5c3FA2d38f8377b3d6631df418fd599"

export let accountAddress = undefined
export let web3Modal = undefined
export let chainId = null
export let customBookContract = null
export let relicContract = null
export let goldenContract = null

async function updateAccount() {
  const accounts = await web3Modal.eth.getAccounts()
  updateAccountAddress(accounts)

  if (web3ModalProvider !== undefined && web3ModalProvider !== null) {
    web3ModalProvider.on("accountsChanged", (accounts) => {
      updateAccountAddress(accounts)
      console.log('called account changed')
      store.dispatch({ type: CHANGE_WALLET, payload: accounts[0] })
    });
    web3ModalProvider.on("chainChanged", (id) => {
      window.location.reload()
    });
  }
}

export async function initWallet() {
  try {
    web3Modal = await connectToWallet()

    chainId = await web3Modal.eth.net.getId();
    customBookContract = new web3Modal.eth.Contract(
      CustomNFTBookAbi, CustomBookAddres
    )
    relicContract = new web3Modal.eth.Contract(
      RelicAbi, RelicAddress
    )
    goldenContract = new web3Modal.eth.Contract(
      GoldenAbi, GoldenAddress
    )
    await updateAccount()
  } catch (e) {
    console.log("wallet connect error, reconnecting")
  }
}

export function updateAccountAddress(accounts) {
  if (accounts !== undefined && accounts.length > 0) {
    accountAddress = accounts[0]
  } else if (accountAddress !== undefined) {
    clearWalletProvider()
    accountAddress = undefined
  }
}
