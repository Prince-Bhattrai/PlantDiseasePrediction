import React from 'react'
import "./notfound.css"
import notfound from "../../assets/images/notfound.png"
import { IoHomeOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
const Notfound = () => {
    const navigate = useNavigate()
    return (
        <div className='notfound' >
            <div className="texts">
                <h1>Oops! We've wandered off the trail.</h1>
                <p>The page you're looking for seems to have withered away or was never planted.</p>
            </div>
            <button onClick={()=>navigate("/")}><IoHomeOutline /> Go to Home</button>
        </div>
    )
}

export default Notfound