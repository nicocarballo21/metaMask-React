import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import OnBoardingBtn from "./components/onBoardingBtn"
import SendEth from "./components/sendEth"
import Encrypt from "./components/encrypt"

import Web3 from "web3"
const web3 = new Web3(Web3.givenProvider || "http://localhost:3000")

const App = () => {
  return (
    <div className="container">
      <OnBoardingBtn />
      <SendEth web3={web3} />
      <Encrypt web3={web3} />
    </div>
  )
}

export default App
