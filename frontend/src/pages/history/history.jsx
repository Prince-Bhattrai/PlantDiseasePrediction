import React, { useContext } from 'react'
import "./history.css"
import { GoSearch } from 'react-icons/go'
import { AppContext } from '../../context/AppContext'
import HistoryCard from '../../components/historyCard/historyCard'
const History = () => {
    const {history} = useContext(AppContext)
    return (
        <div className='history'>
            <div className="top">
                <div className="texts">
                    <h1>Prediction History</h1>
                    <p>Review and manage your historical crop health scans. Search by plant species or detected pathogen to filter your results.</p>
                </div>
                <div className="actions">
                    <fieldset>
                        <input type="text" placeholder='Fitler by plant or disease...'/>
                        <p><GoSearch /> </p>
                    </fieldset>
                    <button>Clear History</button>
                </div>
                
            </div>
            <div className="data">
                {history.map((v, i)=>(
                    <HistoryCard 
                    cnfidenseScore={v.confidence}
                    createdAt={v.createdAt}
                    image={v.image.url}
                    key={v._id}
                    id={v._id}
                    
                    />
                ))}
            </div>

        </div>
    )
}

export default History