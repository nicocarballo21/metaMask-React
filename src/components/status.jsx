import React from "react"
import { ButtonGroup, Button } from "react-bootstrap"
import useStatusNetwork from "../customHooks/useStatusNetwork"

const Status = () => {
  const [getNetworkId, getChainId] = useStatusNetwork()

  return (
    <ButtonGroup style={{ marginLeft: "20px" }}>
      <Button variant="warning" onClick={getNetworkId}>
        Network ID
      </Button>

      <Button variant="warning" onClick={getChainId}>
        Chain ID
      </Button>
    </ButtonGroup>
  )
}

export default Status
