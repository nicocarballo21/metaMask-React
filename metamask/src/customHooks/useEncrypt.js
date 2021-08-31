import { useState, useEffect } from "react"
import EthSigEncryption from "eth-sig-encrypt"

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
  }, [])

  const getKey = async () => {
    const accounts = await web3.eth.getAccounts()

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

  const encrypt = async () => {
    const finalEncrypted = EthSigEncryption.encrypt(toEncrypt, { account: accounts[0] })

    setencrypted(finalEncrypted)
  }
  const decrypt = async () => {
    const finalEncrypted = EthSigEncryption.decrypt(encrypted, { account: accounts[0] })

    setdecryptedWord(finalEncrypted)
  }
  return [key, err, decryptedWord, encrypted, { functions: { getKey, encrypt, decrypt } }]
}
