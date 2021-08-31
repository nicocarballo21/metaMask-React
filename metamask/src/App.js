import React from "react"
import "bootstrap/dist/css/bootstrap.min.css"

import OnBoardingBtn from "./components/onBoardingBtn"
import SendEth from "./components/sendEth"

const App = () => {
  return (
    <div className="container">
      <OnBoardingBtn />
      <SendEth />
    </div>
  )
}

export default App
