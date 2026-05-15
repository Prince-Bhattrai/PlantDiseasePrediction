import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { GoAlert } from 'react-icons/go'
import { TiTick } from 'react-icons/ti'
import "./historyDetails.css"
import { IoShareSocialSharp } from 'react-icons/io5'
import { toast } from 'react-toastify'
import Notfound from '../../components/notfound/notfound'
const HistoryDetails = () => {
  const { id } = useParams()
  console.log("ID", id)
  const { history, token } = useContext(AppContext)
  const thisHistory = history?.find(h => h._id === id)
  const navigate = useNavigate()


  const copyLink = async () => {
    const url = `http://localhost:5173/prediction/${id}`
    await navigator.clipboard.writeText(url)
    return toast.success("Link copied", { theme: "dark" })
  }
  

  return (
    <div className='history-details'>
      <div className="left">
        <div className="imagebox">
          <img src={thisHistory?.image?.url} alt="" />
        </div>
        <div className="options">
          <i>Detected: {thisHistory.disease}</i>
          <p onClick={copyLink}>{<IoShareSocialSharp />}</p>
        </div>
      </div>
      <div className="right">
        <p>Infection Identified</p>
        <h1>{thisHistory.plant}</h1>
        <div className={`alert ${thisHistory.disease !== "healthy" ? "dis" : "hel"}`}>
          <p>{thisHistory.disease !== "healthy" ? <GoAlert /> : <TiTick />}</p>
          <p>{thisHistory.disease}</p>
        </div>

        <div className="conf-score">
          <div className="score">
            <p>AI Confidence Score</p>
            <p>{thisHistory.confidence}%</p>
          </div>
          <div className={`range`}>
            <div className={`inner-range ${thisHistory.confidence < 90 ? "low" : ""}`} style={{ width: thisHistory.confidence }}>

            </div>
          </div>
        </div>
        <button>Delete History</button>

      </div>
    </div>
  )
}

export default HistoryDetails