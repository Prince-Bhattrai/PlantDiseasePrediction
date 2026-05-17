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


    const splitName = currUser?.name?.split(" ") || []

    const first = splitName?.[0]?.[0] || ""
    const last = splitName?.at(-1)?.[0] || ""

    return (
        <nav>
            <div className="logo">
                <p onClick={()=>window.location.href = "/"}>BotaniScan</p>

                <p onClick={() => setShow(!show)}><MdMenu style={{ color: "#fff" }} /></p>
            </div>
            {token && (
                <ul className={show && currUser ? "show" : ""}>
                    <li onClick={() => { setActive("home"), navigate("/"), setShow(false) }} className={active === "home" ? "active" : ""}>Home</li>
                    <li onClick={() => { setActive("history"), navigate("/history"), setShow(false) }} className={active === "history" ? "active" : ""}>History</li>
                    <li onClick={() => { setActive("predict"), navigate("/prediction"), setShow(false) }} className={active === "predict" ? "active" : ""}>Predict</li>
                </ul>
            )}
            {token ? <button style={{
                padding:"12px",
                fontSize:"20px",
                borderRadius:"50%",
                width:"fit-content",
                textTransform:"uppercase"
            }} onClick={() =>{setShow(false), navigate(`/profile/${currUser?._id}`)}} className={show && currUser ? "show-btn" : ""}>{first}{last}</button> : (
                <button className={show ? "show-btn" : ""} onClick={() => { navigate("/auth"), setShow(false) }}>Log in</button>

            )}

        </nav>
    )
}

export default Navbar