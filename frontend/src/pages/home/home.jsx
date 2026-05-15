import React from 'react'
import "./home.css"
import Landing from '../../components/landing/landing'
import Info from '../../components/info/info'
const Home = () => {
    return (
        <div className='home'>
            <Landing />
            <Info />
            <div className="information">
                <div className="con">
                    <div className="text">
                        <h1>99.4%</h1>
                        <p>Model Accuracy</p>
                    </div>
                    <div className="text">
                        <h1>120M+</h1>
                        <p>Plants Scanned</p>
                    </div>
                </div>
                <div className="con">
                    <div className="text">
                        <h1>45%</h1>
                        <p>Yield Increase</p>
                    </div>
                    <div className="text">
                        <h1>24/7</h1>
                        <p>Real-time Support</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Home