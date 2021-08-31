import { useState, useEffect } from "react"
import { encrypt } from "eth-sig-util"

export default function useEncrypt({ web3, toEncrypt }) {
  const [publicKey, setPublickey] = useState("")
  const [err, seterr] = useState("")
  const [accounts, setaccounts] = useState([])
  const [encrypted, setencrypted] = useState("")
  const [decryptedWord, setdecryptedWord] = useState("")

  useEffect(() => {
    const init = async () => {
      const accounts_res = await web3.eth.getAccounts()
      setaccounts(accounts_res)
    }
    init()
  }, [web3.eth])

  const getPublicKey = async () => {
    try {
      const key = await window.ethereum.request({
        method: "eth_getEncryptionPublicKey",
        params: [accounts[0]]
      })
      setPublickey(key)
    } catch (err) {
      seterr(err)
    }
  }

  const encryptF = async () => {
    try {
      const encrypted = web3.utils.toHex(
        JSON.stringify(encrypt(publicKey, { data: toEncrypt }, "x25519-xsalsa20-poly1305"))
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

  return [
    publicKey,
    err,
    decryptedWord,
    encrypted,
    { functions: { getPublicKey, encryptF, decrypt } }
  ]
}
