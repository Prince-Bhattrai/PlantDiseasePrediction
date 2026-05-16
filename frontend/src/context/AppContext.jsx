import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

export const AppContext = createContext()

export const AppProvider = ({ children }) => {
    const [currUser, setCurrUser] = useState([])
    const [history, setHistory] = useState([])
    const [token, setToken] = useState("")
    const [profileInfo, setProfileInfo] = useState("")

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (!token) return;
        getUserData(token)
        setToken(token)
    }, [])

    const getUserData = async (token) => {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        const apiUrl = import.meta.env.VITE_API_URL
        try {
            const userRes = await axios.get(`${apiUrl}/v1/api/user/currUser`, config)
            console.log(userRes.data)
            setCurrUser(userRes.data.user)
        } catch (error) {
            console.log(error)
        }
        try {
            const historyRes = await axios.get(`${apiUrl}/v1/api/history/get`, config)
            console.log(historyRes.data)
            setHistory(historyRes.data.history)
        } catch (error) {
            console.log(error)
        }
        try {
            const profileInfoRes = await axios.get(`${apiUrl}/v1/api/history/profile-info`, config)
            console.log(profileInfoRes.data)
            setProfileInfo(profileInfoRes.data.profileInfo)

        } catch (error) {
            console.log(error)
        }

    }
    return (
        <AppContext.Provider value={{currUser,history, setHistory, token,
            profileInfo,setCurrUser
        }}>
            {children}
        </AppContext.Provider>
    )
}