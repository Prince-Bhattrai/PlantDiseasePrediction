import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import "./profile.css"
import { AppContext } from '../../context/AppContext'
const Profile = () => {
    const {id} = useParams()
    const {currUser} = useContext(AppContext)
    const splitName = currUser.name?.split(" ")
    const first = splitName[0][0]
    const last = splitName.at(-1)[0]
    console.log(first)
    console.log(last)
  return (
    <div className='profile'>
        <div className="user-info">
            <p>{first}{last}</p>
            <div className="info">
                <p>{currUser.name}</p>
                <p>{currUser.email}</p>

            </div>
            <div className="join">
                <p>Verified Agronomist</p>
                <p>Joined {new Date(currUser.createdAt).toDateString()}</p>
            </div>
        </div>
    </div>
  )
}

export default Profile

