import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import "./settings.css"
import Spinner from '../spinner/spinner'
function Settings() {

    const { currUser, setCurrUser } = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const [name, setName] = useState(currUser?.name || "")
    const [email, setEmail] = useState(currUser?.email || "")
    const [address, setAddress] = useState(currUser?.address || "")

    const submithandler = async (e) => {

        e.preventDefault()
        setLoading(true)
        const token = localStorage.getItem("token")

        if (!token) {
            setLoading(false)
            return toast.error("Unauthorized!")

        }

        try {

            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/v1/api/user/setting`,
                {
                    name,
                    email,
                    address
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            console.log(response.data)
            setLoading(false)
            if (response.data.success) {
                setLoading(false)
                toast.success(
                    response.data.message || "Profile updated!"
                    , { theme: "dark" })
                return setCurrUser(response?.data?.user)

            }


        } catch (error) {
            setLoading(false)
            console.log(error)
            return toast.error(
                error?.response?.data?.message ||
                "Something went wrong!"
            )
        }
    }

    const resetAsDefaut = () => {
        setName(currUser.name)
        setEmail(currUser.email)
        setAddress(currUser.address)
    }

    return (
        <div className='settings'>
            <div className="setting-top">
                <p>Account Settings</p>
                <p onClick={resetAsDefaut}> Reset to Default</p>
            </div>
            <form onSubmit={submithandler}>
                <fieldset>
                    <label>Full Name</label>
                    <input
                        type="text"
                        placeholder='Enter full name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                </fieldset>
                <fieldset>
                    <label>Location</label>
                    <input
                        type="text"
                        placeholder='Enter location'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />

                </fieldset>
                <fieldset>
                    <label>Email Address</label>

                    <input
                        type="email"
                        placeholder='Enter email address'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                </fieldset>

                <div className="actions">

                    <button
                        type='button'
                        onClick={() => {
                            setName(currUser?.name || "")
                            setEmail(currUser?.email || "")
                            setAddress(currUser?.address || "")
                        }}
                    >
                        Discard Changes
                    </button>

                    {!loading && (
                        <button type='submit'>
                            Save Profile
                        </button>
                    )}
                    {loading && (
                        <button 
                        style={{display:"flex", alignItems:'center', justifyContent:"center"}} type='button'>
                            <Spinner height={20} width={20} />
                        </button>
                    )}

                </div>

            </form>

        </div>
    )
}

export default Settings