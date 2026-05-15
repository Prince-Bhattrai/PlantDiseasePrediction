import React from 'react'
import { FaRegEye } from 'react-icons/fa6'

const HistoryCard = ({ image, id, createdAt, cnfidenseScore, isInfected, plantName }) => {
    return (
        <div className='history-card'>
            <div className="head">
                <img src="" alt="" />
                <div className="fade">
                    <button>
                        <FaRegEye />
                        View Details
                    </button>
                </div>
            </div>
            <div className="data">
                
            </div>
        </div>
    )
}

export default HistoryCard