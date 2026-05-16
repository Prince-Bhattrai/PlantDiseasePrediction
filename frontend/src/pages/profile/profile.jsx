import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import "./profile.css"
import { AppContext } from '../../context/AppContext'
import { MdOutlineAnalytics, MdOutlineVerified } from 'react-icons/md'
import { FaRegHeart } from 'react-icons/fa6'
import { LuLeaf } from 'react-icons/lu'
import Settings from '../../components/setttings/settings'
const Profile = () => {
    const { id } = useParams()
    const { currUser, profileInfo } = useContext(AppContext)
    const splitName = currUser.name?.split(" ")
    const first = splitName[0][0]
    const last = splitName.at(-1)[0]

    const logoutHandler = async()=>{
        await localStorage.removeItem("token")
        return window.location.href = "/"
    }



    return (
        <div className='profile'>
            <div className="user-info">
                <div className="user-card">
                    <p>{first}{last}</p>
                    <div className="user-details">
                        <p>{currUser.name}</p>
                        <p>{currUser.email}</p>

                    </div>
                    <div className="join">
                        <p style={{display:"flex",
                             alignItems:"center",
                              justifyContent:"center",
                              gap:"5px"}}><MdOutlineVerified size={20}/> Verified Agronomist</p>
                        <p>Joined {new Date(currUser.createdAt).toDateString()}</p>
                    </div>
                </div>
                <div className="user-plan">
                    <div className="plan-info">
                        <p>Current plan</p>
                        <p>Enterprise Pro</p>
                        <p>Renewal: June 12, 2024</p>

                    </div>
                    <button>Manage Subscription</button>
                </div>
            </div>

            <div className="card-container">
                <div className="ana-card">
                    <p><MdOutlineAnalytics /></p>
                    <div className="ana">
                        <p>Total Prediction</p>
                        <p>{profileInfo?.totalPrediction}</p>

                    </div>
                </div>
                <div className="ana-card">
                    <p><FaRegHeart /></p>
                    <div className="ana">
                        <p>Health Score</p>
                        <p>{profileInfo?.healthScore}%</p>
                        
                    </div>
                </div>
                <div className="ana-card">
                    <p><LuLeaf /></p>
                    <div className="ana">
                        <p>Species Tracked</p>
                        <p>{profileInfo?.totalPrediction}</p>
                        
                    </div>
                </div>
            </div>
            <Settings />
            <div className="logout-box">
                <button onClick={logoutHandler} style={{padding:"20px 80px", background:"linear-gradient(120deg, red, orange)"}} >Log out</button>
            </div>
            
        </div>
    )
}

export default Profile

