import React, { useState, useEffect, useRef } from "react"
import MetaMaskOnboarding from "@metamask/onboarding"
import { Card, Button } from "react-bootstrap"
import Status from "./status"

const ONBOARD_TEXT = "Click here to install MetaMask!"
const CONNECT_TEXT = "Connect"
const CONNECTED_TEXT = "Connected"

const OnboardingButton = () => {
  const [buttonText, setButtonText] = useState(ONBOARD_TEXT)
  const [isDisabled, setDisabled] = useState(false)
  const [accounts, setAccounts] = useState([])
  const onboarding = useRef()

  useEffect(() => {
    if (!onboarding.current) {
      onboarding.current = new MetaMaskOnboarding()
    }
  }, [])

  useEffect(() => {
    const handleNewAccounts = newAccounts => {
      setAccounts(newAccounts)
    }
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      // window.ethereum.request({ method: "eth_requestA1ccounts" }).then(handleNewAccounts)
      window.ethereum.on("accountsChanged", handleNewAccounts)
      return () => {
        window.ethereum.off("accountsChanged", handleNewAccounts)
      }
    }
  }, [])

  useEffect(() => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      if (accounts.length > 0) {
        setButtonText(CONNECTED_TEXT)
        setDisabled(true)
        onboarding.current.stopOnboarding()
      } else {
        setButtonText(CONNECT_TEXT)
        setDisabled(false)
      }
    }
  }, [accounts])

  const onClick = async () => {
    if (MetaMaskOnboarding.isMetaMaskInstalled()) {
      try {
        const newAccounts = await window.ethereum.request({ method: "eth_requestAccounts" })
        setAccounts(newAccounts)
        window.alert("now you are log in")
      } catch (err) {
        console.log(err)
      }
    } else {
      onboarding.current.startOnboarding()
    }
  }

  return (
    <div>
      <hr />
      <Card bg={"secondary"}>
        <Card.Body>
          <Button variant="warning" disabled={isDisabled} onClick={onClick}>
            {buttonText}
          </Button>
          <Status />
          <Card.Body>
            <p style={{ color: "white" }}>Account: {accounts}</p>
          </Card.Body>
        </Card.Body>
      </Card>
      <hr />
    </div>
  )
}

export default OnboardingButton
