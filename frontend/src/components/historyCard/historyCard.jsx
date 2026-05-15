import React from 'react'
import { CiCalendarDate } from 'react-icons/ci'
import { FaRegEye } from 'react-icons/fa6'
import "./historyCard.css"
import { useNavigate } from 'react-router-dom'
const HistoryCard = ({ image, id, createdAt, confidenseScore, plant, disease }) => {
    const navigate = useNavigate()
    return (
        
        <div className='history-card'>
            <div className="head">
                <img src={image} alt="" />
                <div className="fade">
                    <button onClick={()=>navigate(`/prediction/${id}`)}>
                        <FaRegEye />
                        View Details
                    </button>
                </div>
            </div>
            <div className="card-data">
                <div className="card-top">
                    <div className="left-side">
                        <p>{disease?.slice(0, 15) || "Not provided"}...</p>
                        <p>{plant || "Not provided"}</p>
                    </div>
                    <p className={confidenseScore>90?"high":'low'}>{confidenseScore}% conf.</p>
                </div>
                <hr />
                <div className="tail">
                    <p><CiCalendarDate /> {new Date(createdAt).toDateString()}</p>
                    <p className={disease !=="healthy"?"inf":"hel"}>{disease !== "healthy" ? "infected" : "healthy"}</p>
                </div>
            </div>
        </div>
    )
}

export default HistoryCard