import React, { useContext, useEffect, useState } from 'react'
import "./navbar.css"
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'
import { MdMenu } from 'react-icons/md'
const Navbar = () => {
    const [active, setActive] = useState("home")
    const navigate = useNavigate()
    const { currUser, token } = useContext(AppContext)
    const [show, setShow] = useState(false)

    
    return (
        <nav>
            <div className="logo">
                <p>BotaniScan</p>

                <p onClick={() => setShow(!show)}><MdMenu style={{ color: "#fff" }} /></p>
            </div>
            {token && (
                <ul className={show && currUser ? "show" : ""}>
                    <li onClick={() => { setActive("home"), navigate("/"), setShow(false) }} className={active === "home" ? "active" : ""}>Home</li>
                    <li onClick={() => { setActive("history"), navigate("/history"), setShow(false) }} className={active === "history" ? "active" : ""}>History</li>
                    <li onClick={() => { setActive("predict"), navigate("/prediction"), setShow(false) }} className={active === "predict" ? "active" : ""}>Predict</li>
                </ul>
            )}
            {token? <button onClick={()=>navigate(`/profile/${currUser._id}`)} className={show && currUser ? "show-btn" : ""}>Profile</button> : (
                <button className={show ? "show-btn" : ""} onClick={() => navigate("/auth")}>Log in</button>

            )}

        </nav>
    )
}

export default Navbar