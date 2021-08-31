import React, { useState } from "react"
import { Card, FormControl, Button } from "react-bootstrap"

import useEncrypt from "../customHooks/useEncrypt"

const Encrypt = ({ web3 }) => {
  const [toEncrypt, settoEncrypt] = useState("")
  const [key, err, decryptedWord, encrypted, { functions }] = useEncrypt({ web3, toEncrypt })

  return (
    <Card bg={"secondary"}>
      <Card.Body>
        <p style={{ color: "white" }}>Here you can Encrypt / Decrypt</p>
        <Button variant="warning" onClick={functions.getKey}>
          Get encryption key
        </Button>
        {err.code === 4001 && <p>We can't encrypt anything without the key</p>}
        {key && (
          <div>
            <p style={{ marginTop: "10px", color: "white" }}>Your encrypt key is: {key}</p>
            <FormControl
              placeholder="To encrypt.."
              onChange={({ target }) => settoEncrypt(target.value)}></FormControl>
            <Button
              style={{ marginTop: "10px", marginBottom: "10px" }}
              variant="warning"
              onClick={functions.encryptF}>
              Encrypt
            </Button>
          </div>
        )}

        {encrypted && (
          <div>
            <p style={{ color: "white" }}>Your encrypted word is {encrypted} </p>
            <hr />
            <h5 style={{ color: "white" }}>Decrypt action:</h5>
            <Button variant="warning" onClick={functions.decrypt}>
              Decrypt
            </Button>
            {decryptedWord && (
              <p style={{ color: "white", marginTop: "10px" }}>
                Your word decrypted is: {decryptedWord}
              </p>
            )}
          </div>
        )}
      </Card.Body>
    </Card>
  )
}

export default Encrypt
