import React, { useContext, useEffect, useState } from 'react'
import "./history.css"
import { GoSearch } from 'react-icons/go'
import { AppContext } from '../../context/AppContext'
import HistoryCard from '../../components/historyCard/historyCard'
import { useNavigate } from 'react-router-dom'
import Notfound from '../../components/notfound/notfound'

const History = () => {

    const { history, token } = useContext(AppContext)
    const [search, setSearch] = useState("")


    const filteredData = history.filter((h) => {

        if (!search) return true

        const query = search.toLowerCase()
        const plant = h?.plant?.toLowerCase() || ""
        const disease = h?.disease?.toLowerCase() || ""

        return (
            plant.includes(query) ||
            disease.includes(query)
        )
    })

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
                            value={search}
                            onChange={(e)=>setSearch(e.target.value)}
                        />

                        <p>
                            <GoSearch />
                        </p>
                    </fieldset>

                    <button>Clear History</button>

                </div>

            </div>

            {filteredData.length > 0 ? (

                <div className="data">

                    {filteredData.map((v) => (

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