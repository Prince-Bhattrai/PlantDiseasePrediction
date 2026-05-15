import React from 'react'
import { FaArrowRightLong, FaDisease } from 'react-icons/fa6'
import { ImPower } from 'react-icons/im'
import { RiChatHistoryFill } from 'react-icons/ri'
import "./info.css"

const Info = () => {
    return (
        <div className='info'>
            <div className="top">
                <h1>Smart Agricultural Insights</h1>
                <p>Our platform combines proprietary vision models with agronomic expertise to provide immediate value for your operations.</p>

            </div>
            <div className="cards">
                <div className="card">
                    <p><ImPower /></p>
                    <p>Fast Prediction</p>
                    <p>Receive diagnosis results in under 2 seconds. Our edge-optimized AI processing ensures you get answers right in the field, even with limited connectivity.</p>
                    <p>Learn More <FaArrowRightLong /></p>
                </div>
                <div className="card">
                    <p><FaDisease /></p>
                    <p>Disease Detection</p>
                    <p>Identification for over 150+ common and rare plant pathogens. From early-stage blight to nutrient deficiencies, we cover the entire health spectrum.</p>
                    <p>Explore library <FaArrowRightLong /></p>
                </div>
                <div className="card">
                    <p><RiChatHistoryFill /></p>
                    <p>Prediction History</p>
                    <p>Maintain a digital record of all scans and field observations. Track historical trends across different seasons to optimize your treatment protocols.</p>
                    <p>View dashboard <FaArrowRightLong /></p>
                </div>
            </div>
        </div>
    )
}

export default Info