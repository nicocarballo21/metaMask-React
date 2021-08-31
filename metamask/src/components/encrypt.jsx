import React, { useState } from "react"
import { Card, FormControl, Button } from "react-bootstrap"
import EthSigEncryption from "eth-sig-encrypt"

const Encrypt = ({ web3 }) => {
  const [key, setKey] = useState("")
  const [err, seterr] = useState("")
  const [toEncrypt, settoEncrypt] = useState("")
  const [encrypted, setencrypted] = useState("")
  const [decryptWord, setdecryptWord] = useState("")

  ////
  ///
  ///
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
    const accounts = await web3.eth.getAccounts()
    const finalEncrypted = EthSigEncryption.encrypt(toEncrypt, { account: accounts[0] })

    setencrypted(finalEncrypted)
  }

  const decrypt = async () => {
    const accounts = await web3.eth.getAccounts()
    const finalEncrypted = EthSigEncryption.decrypt(encrypted, { account: accounts[0] })

    setdecryptWord(finalEncrypted)
  }

  return (
    <Card>
      <Card.Body>
        <p>Here you can Encrypt / Decrypt</p>
        <Button onClick={getKey}>Get encryption key</Button>
        {err.code === 4001 && <p>We can't encrypt anything without the key</p>}
        {key && (
          <div>
            <p style={{ marginTop: "10px" }}>Your encrypt key is: {key}</p>
            <FormControl
              placeholder="To encrypt.."
              onChange={({ target }) => settoEncrypt(target.value)}></FormControl>
            <Button onClick={encrypt}>Encrypt</Button>
          </div>
        )}
        {encrypted && (
          <div>
            <p>Your encrypted word is {encrypted} </p>
            <hr />
            <p>decrypt</p>
            <Button onClick={decrypt}>Encrypt</Button>
            {decryptWord && <p>Your word decrypted is: {decryptWord}</p>}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default Encrypt
