import React from 'react'
import { FaLeaf } from 'react-icons/fa6'
import sample from "../../assets/images/sample.png"
import { TiTick } from 'react-icons/ti'
import "./landing.css"
const Landing = () => {
    return (
        <div className='landing'>

            <div className="left">
                <div className="info">
                    <p>ai-powres analysis</p>
                    <h1>ai plant disease detection</h1>
                    <p>Empower your agricultural productivity with precision intelligence. Instantly diagnose crop diseases, monitor plant health, and receive actionable insights from our advanced neural networks.</p>
                    <div className="actions">
                        <button>
                            <FaLeaf />
                            upload plant image
                        </button>
                        <button>
                            Watch demo
                        </button>
                    </div>

                </div>
                <hr />
                <div className="trust">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className={`people  ${i === 1 ? "first" : i === 2 ? "second" : "third"}`}>


                        </div>
                    ))}
                    <p>Trusted by 5,000+ commercial farmers</p>
                </div>
            </div>
            <div className="right">
                <div className="imagebox">
                    <img src={sample} alt="" />

                </div>
                <div className="status">
                    <div className="right-side">
                        <p>{<TiTick />}</p>

                    </div>
                    <div className="dec">
                        <p>Status Detected</p>
                        <p>Healthy Crop</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing