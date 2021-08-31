import React, { useState, useEffect } from "react"
import { Card, Button } from "react-bootstrap"
import Web3 from "web3"

const web3 = new Web3(Web3.givenProvider || "http://localhost:3001")

const Contracts = () => {
  const [accounts, setaccounts] = useState([])

  useEffect(() => {
    const getAccounts = async () => {
      const accounts = await web3.eth.getAccounts()
      setaccounts(accounts)
    }

    getAccounts()
  }, [])

  const deployContract = async () => {
    await new web3.eth.Contract([
      {
        constant: true,
        inputs: [],
        name: "owner",
        outputs: [{ name: "", type: "address" }],
        payable: false,
        stateMutability: "view",
        type: "function"
      },
      {
        constant: false,
        inputs: [],
        name: "deposit",
        outputs: [{ name: "", type: "uint256" }],
        payable: true,
        stateMutability: "payable",
        type: "function"
      },
      { inputs: [], payable: false, stateMutability: "nonpayable", type: "constructor" }
    ])
      .deploy({ data: "0x29a2241af62c0000" })
      .send({ gas: "1000000", from: accounts[0] }, (err, res) => {
        if (err) console.log(err)
        else window.alert(res)
      })
  }

  const send_eth = async () => {
    web3.eth.sendTransaction(
      {
        from: accounts[0],
        to: "0x2f318C334780961FB129D2a6c30D0763d9a5C970",
        value: "0x29a2241af62c0000",
        gas: 21000,
        gasPrice: 20000000000
      },
      (err, result) => {
        if (err) console.error(err)
        else console.log(result)
      }
    )
  }

  return (
    <Card>
      <Card.Body>
        <Button onClick={send_eth}>Send eth</Button>
        <hr />
        <p>Contracts</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button onClick={send_eth} onClick={deployContract}>
            Deploy contract
          </Button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default Contracts
