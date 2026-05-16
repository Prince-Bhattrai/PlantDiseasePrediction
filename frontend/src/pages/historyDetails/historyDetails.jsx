import React, { useContext, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { GoAlert } from 'react-icons/go'
import { TiTick } from 'react-icons/ti'
import "./historyDetails.css"
import { IoShareSocialSharp } from 'react-icons/io5'
import { toast } from 'react-toastify'
import Notfound from '../../components/notfound/notfound'
import axios from 'axios'
const HistoryDetails = () => {
  const { id } = useParams()
  console.log("ID", id)
  const { history, token , setHistory} = useContext(AppContext)
  const thisHistory = history?.find(h => h._id === id)
  const navigate = useNavigate()


  const copyLink = async () => {
    const url = `http://localhost:5173/prediction/${id}`
    await navigator.clipboard.writeText(url)
    return toast.success("Link copied", { theme: "dark" })
  }

  const deleteHistory = async (id) => {
    if (!id) return;
    const token = localStorage.getItem("token")
    if(!token) return toast.error("Unauthorized!", {theme:"dark"})
    try {
      const response  = await axios.delete(`${import.meta.env.VITE_API_URL}/v1/api/history/delete/${id}`,{
      headers:{
        Authorization:`Bearer ${token}`
      }
      })

      console.log(response.data)
      if(response.data.success){
        toast.success(response.data.message, {theme:"dark"})
        setHistory(prev=>prev.filter((p)=>p._id !== id))
        return navigate("/history")
      }
    } catch (error) {
      console.log(error)
      return toast.error(error.response.data.message)
      
    }
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
            <div className={`inner-range ${thisHistory.confidence < 90 ? "low" : ""}`} style={{ width: `${thisHistory.confidence}%` }}>

            </div>
          </div>
        </div>
        <button onClick={()=>deleteHistory(id)}>Delete History</button>

      </div>
    </div>
  )
}

export default HistoryDetails