import React, { useContext } from 'react'
import { AppContext } from './context/AppContext'
import { Route, Routes } from 'react-router-dom'
import SignupLogin from './pages/signupLogin/signupLogin'
import Home from "./pages/home/home"
import Navbar from './components/navbar/navbar'
import History from './pages/history/history'
import Prediction from './pages/prediction/prediction'
import HistoryDetails from './pages/historyDetails/historyDetails'
import { ToastContainer } from "react-toastify"
const App = () => {
  const {name} = useContext(AppContext)
  return (
    <>
    <Navbar />
    <ToastContainer />
    <Routes>
      <Route path='/auth' element={<SignupLogin />}/>
      <Route path = "/" element = {<Home />} />
      <Route path = "/history" element={<History />} />
      <Route path = "/prediction" element = {<Prediction />} />
      <Route path = "/prediction/:id" element={<HistoryDetails />} />
    </Routes>
    </>
  )
}

export default App