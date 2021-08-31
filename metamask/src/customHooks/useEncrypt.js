import { useState, useEffect } from "react"
// import EthSigEncryption from "eth-sig-encrypt"
// import EthCrypto from "eth-crypto"
import { encrypt } from "eth-sig-util"

export default function useEncrypt({ web3, toEncrypt }) {
  const [accounts, setaccounts] = useState([])
  const [encrypted, setencrypted] = useState("")
  const [decryptedWord, setdecryptedWord] = useState("")
  const [key, setKey] = useState("")
  const [err, seterr] = useState("")

  useEffect(() => {
    const init = async () => {
      const accounts_res = await web3.eth.getAccounts()
      setaccounts(accounts_res)
    }
    init()
  }, [web3.eth])

  const getKey = async () => {
    try {
      const encrypKey = await window.ethereum.request({
        method: "eth_getEncryptionPublicKey",
        params: [accounts[0]]
      })
      setKey(encrypKey)
    } catch (err) {
      seterr(err)
    }
  }

  const encryptF = async () => {
    try {
      const encrypted = web3.utils.toHex(
        JSON.stringify(encrypt(key, { data: toEncrypt }, "x25519-xsalsa20-poly1305"))
      )
      setencrypted(encrypted)
    } catch (err) {
      console.log(err)
    }
  }

  const decrypt = async () => {
    try {
      const decrypted = await window.ethereum.request({
        method: "eth_decrypt",
        params: [encrypted, accounts[0]]
      })
      setdecryptedWord(decrypted)
    } catch (err) {
      console.log(err)
    }
  }

  return [key, err, decryptedWord, encrypted, { functions: { getKey, encryptF, decrypt } }]
}
