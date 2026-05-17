import React, { useContext, useEffect, useState } from 'react'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { IoLocationOutline } from 'react-icons/io5'
import { MdLockOutline } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import "./setPassword.css"
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import Spinner from '../spinner/spinner'

const SetPassword = () => {
    const [showPass, setShowPass] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [location, setLocation] = useState("")
    const [oldPassword, setOldPassword] = useState("")
    const [conformNewPassword, setConformNewPassword] = useState("")
    const { currUser, token } = useContext(AppContext)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const submithandler = async (e) => {
        
        e.preventDefault()
        setLoading(true)
        if (currUser.password) {
            if (!oldPassword || !newPassword || !conformNewPassword) {
                setLoading(false)
                return setErrorMessage("All fields are required!")
            }
        }
        if (!newPassword || !conformNewPassword) {
            setLoading(false)
            return setErrorMessage("Please fill required fields!")
        }
        if (conformNewPassword !== newPassword) {
            setLoading(false)
            return setErrorMessage("New password and conform password must be same!")
        }
        try {
            const response = await axios.put(`${import.meta.env.VITE_API_URL}/v1/api/user/password`, { newPassword, oldPassword },{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            console.log(response.data)
            setLoading(false)
            if (response.data.success) {
                setErrorMessage(response.data.message)
                setLoading(false)
                return navigate(`/profile/${currUser._id}`)

            }
        } catch (error) {
            setLoading(false)
            console.log(error)
            return setErrorMessage(error?.response?.data?.message || "Something went wrong")
        }
    }

    return (
        <div className='set-pass'>
            <h1>{currUser.password ? "Change password" : "Set password"}</h1>
            <form action="" onSubmit={submithandler}>
                {errorMessage &&(
                    <p className='error-message'>{errorMessage}</p>
                )}
                {currUser.password && (
                    <fieldset>
                        <label htmlFor="">Old Password*</label>
                        <input placeholder='Old password' type={showPass ? "text" : "password"} value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                        <p><MdLockOutline /></p>
                    </fieldset>
                )}
                <fieldset>
                    <label htmlFor="">New Password*</label>
                    <input type={showPass ? "text" : "password"} value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder='New password' />
                    <p><MdLockOutline /></p>
                </fieldset>
                <fieldset>
                    <label htmlFor="">Conform new Password*</label>
                    <input type={showPass ? "text" : "password"} value={conformNewPassword} onChange={(e) => setConformNewPassword(e.target.value)} placeholder='Conform password' />
                    <p><MdLockOutline /></p>

                </fieldset>
                <div className="actions">
                    <input type="checkbox" checked={showPass} onClick={() => setShowPass(!showPass)} />
                    {loading ? <button type='button' 
                    style={{display:"flex",
                        alignItems:"center",
                        justifyContent:"center"
                    }}><Spinner height={20} width={20} key={"hi"} /></button> :
                        <button type='submit'>{currUser.password ? "Change Password" : "Set Password"}</button>}
                </div>
            </form>
        </div>
    )
}

export default SetPassword