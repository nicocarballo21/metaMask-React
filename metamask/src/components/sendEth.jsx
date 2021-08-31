import React, { useState } from "react"
import { Card, Button, FormControl } from "react-bootstrap"

const SendEth = ({ web3 }) => {
  const [value, setvalue] = useState(0)

  const send_eth = async () => {
    const accounts = await web3.eth.getAccounts()
    web3.eth.sendTransaction(
      {
        from: accounts[0],
        to: "0x2f318C334780961FB129D2a6c30D0763d9a5C970",
        value: web3.utils.toWei(value, "ether"),
        gas: 21000,
        gasPrice: 20000000000
      },
      (err, res) => {
        if (err) console.log(err)
        else {
          console.log(res)
          setvalue(0)
        }
      }
    )
  }

  return (
    <Card>
      <Card.Body>
        <p>Here you can simulate a eth transaction</p>
        <Button onClick={send_eth} style={{ marginBottom: "10px" }}>
          Send eth
        </Button>
        <FormControl
          placeholder="Select a eth amount to send"
          onChange={({ target }) => setvalue(target.value)}></FormControl>
      </Card.Body>
    </Card>
  )
}

export default SendEth
