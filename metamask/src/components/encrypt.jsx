import React, { useState } from "react"
import { Card, FormControl, Button } from "react-bootstrap"

import useEncrypt from "../customHooks/useEncrypt"

const Encrypt = ({ web3 }) => {
  const [toEncrypt, settoEncrypt] = useState("")
  const [key, err, decryptedWord, encrypted, { functions }] = useEncrypt({ web3, toEncrypt })

  return (
    <Card>
      <Card.Body>
        <p>Here you can Encrypt / Decrypt</p>
        <Button onClick={functions.getKey}>Get encryption key</Button>
        {err.code === 4001 && <p>We can't encrypt anything without the key</p>}
        {key && (
          <div>
            <p style={{ marginTop: "10px" }}>Your encrypt key is: {key}</p>
            <FormControl
              placeholder="To encrypt.."
              onChange={({ target }) => settoEncrypt(target.value)}></FormControl>
            <Button onClick={functions.encrypt}>Encrypt</Button>
          </div>
        )}
        {encrypted && (
          <div>
            <p>Your encrypted word is {encrypted} </p>
            <hr />
            <p>decrypt</p>
            <Button onClick={functions.decrypt}>Encrypt</Button>
            {decryptedWord && <p>Your word decrypted is: {decryptedWord}</p>}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default Encrypt
