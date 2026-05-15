import React, { useState } from 'react'
import "./navbar.css"
import { useNavigate } from 'react-router-dom'
const Navbar = () => {
    const [active, setActive] = useState("home")
    const navigate = useNavigate()
    return (
        <nav>
            <p>BotaniScan</p>
            <ul>
                <li onClick={()=>{setActive("home"), navigate("/")}} className={active==="home"?"active":""}>Home</li>
                <li onClick={()=>{setActive("history"), navigate("/history")}} className={active === "history"?"active":""}>History</li>
                <li onClick={()=>{setActive("predict"), navigate("/predict")}} className={active === "predict"?"active":""}>Predict</li>
            </ul>
            <button onClick={()=>navigate("/auth")}>Log in</button>

        </nav>
    )
}

export default Navbar