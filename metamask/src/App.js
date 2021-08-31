import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import OnBoardingBtn from "./components/onBoardingBtn"
import Contracts from "./components/contracts"

const App = () => {
  return (
    <div className="container">
      <OnBoardingBtn />
      <Contracts />
    </div>
  )
}

export default App
