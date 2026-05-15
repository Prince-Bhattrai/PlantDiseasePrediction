import React, { useContext, useEffect } from 'react'
import "./history.css"
import { GoSearch } from 'react-icons/go'
import { AppContext } from '../../context/AppContext'
import HistoryCard from '../../components/historyCard/historyCard'
import { useNavigate } from 'react-router-dom'
import Notfound from '../../components/notfound/notfound'

const History = () => {

    const { history, token } = useContext(AppContext)


    
    return (
        <div className='history'>

            <div className="top">

                <div className="texts">
                    <h1>Prediction History</h1>

                    <p>
                        Review and manage your historical crop health scans.
                        Search by plant species or detected pathogen to filter your results.
                    </p>
                </div>

                <div className="actions">

                    <fieldset>
                        <input
                            type="text"
                            placeholder='Filter by plant or disease...'
                        />

                        <p>
                            <GoSearch />
                        </p>
                    </fieldset>

                    <button>Clear History</button>

                </div>

            </div>

            {history.length > 0 ? (

                <div className="data">

                    {history.map((v) => (

                        <HistoryCard
                            key={v._id}
                            createdAt={v.createdAt}
                            image={v.image?.url}
                            id={v._id}
                            disease={v.disease}
                            plant={v.plant}
                            confidenseScore={v.confidence}
                        />

                    ))}

                </div>

            ) : (

                <p>No history found</p>

            )}

        </div>
    )
}

export default History