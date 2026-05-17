import React, { useState } from 'react'
import { FaRegCircleUser, FaRegEye, FaRegEyeSlash } from 'react-icons/fa6'
import { MdLockOutline, MdOutlineEmail } from 'react-icons/md'
import loginBackground from "../../assets/images/loginBackground.png"
import "./signupLogin.css"
import { toast } from 'react-toastify'
import axios from 'axios'
import Spinner from '../../components/spinner/spinner'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import SetPassword from '../../components/setPassword/setPassword'
import { useNavigate } from 'react-router-dom'

const SignupLogin = () => {
    const [signUp, setSignup] = useState(false)
    const [showPass, setShowPass] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const [passOption, setPassOption] = useState(true)
    const navigate = useNavigate()

    const authHandler = async (e) => {
        const apiUrl = import.meta.env.VITE_API_URL
        setLoading(true)
        try {
            e.preventDefault()
            if (signUp === true) {
                if (!name || !email || !password) {
                    setLoading(false)
                    return toast.error("All fields are required", { theme: "colored" })

                }
                const response = await axios.post(`${apiUrl}/v1/api/user/signup`, {
                    name, email, password
                })
                setLoading(false)
                if (response.data.success) {
                    localStorage.setItem("token", response.data.token)
                    toast.success("Account created", { theme: "colored" })
                    setLoading(false)
                    return window.location.href = "/"
                }

            }
            if (signUp === false) {
                if (!email || !password) {
                    setLoading(false)
                    return toast.error("All fields are required", { theme: "colored" })

                }
                const response = await axios.post(`${apiUrl}/v1/api/user/login`, {
                    email, password
                })
                setLoading(false)
                if (response.data.success) {
                    setLoading(false)
                    localStorage.setItem("token", response.data.token)
                    toast.success("User logged in", { theme: "colored" })
                    return window.location.href = "/"
                }
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            return toast.error(error.response.data.message || "Something went wrong!", { theme: "colored" })
        }
    }
    // const handleSuccess = async (credentialResponse) => {

    //     try {

    //         if (!credentialResponse?.credential) {
    //             return toast.error("Google login failed", {
    //                 theme: "dark"
    //             });
    //         }

    //         const decoded = jwtDecode(credentialResponse.credential);

    //         const response = await axios.post(
    //             `${import.meta.env.VITE_API_URL}/v1/api/user/googleAuth`,
    //             {
    //                 name: decoded.name,
    //                 email: decoded.email,
    //             }
    //         );

    //         if (response.data.success) {

    //             localStorage.setItem("token", response.data.token);

    //             toast.success(response.data.message, {
    //                 theme: "dark"
    //             });

    //             window.location.href = "/";
    //         }

    //     } catch (error) {

    //         console.log(error);

    //         toast.error(
    //             error?.response?.data?.message || "Something went wrong",
    //             {
    //                 theme: "dark"
    //             }
    //         );
    //     }
    // };

    const handleError = (err) => {
        return toast(`Login failed ${err}`, { theme: "dark" })
    }

    const login = useGoogleLogin({

    onSuccess: async (tokenResponse) => {

        try {

            const userInfo = await axios.get(
                "https://www.googleapis.com/oauth2/v3/userinfo",
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`
                    }
                }
            );

            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/v1/api/user/googleAuth`,
                {
                    name: userInfo.data.name,
                    email: userInfo.data.email,
                }
            );

            if (response.data.success) {

                localStorage.setItem("token", response.data.token);

                toast.success(response.data.message, {
                    theme: "dark"
                });

                window.location.href = "/";
            }

        } catch (error) {

            console.log(error);

            toast.error(
                error?.response?.data?.message || "Something went wrong",
                {
                    theme: "dark"
                }
            );
        }
    },

    onError: (error) => {
        console.log(error);

        toast.error("Google login failed", {
            theme: "dark"
        });
    }
});

const loginBtn = () => {
    login();
};
    return (
        <div className="auth">
            <img src={loginBackground} alt="" />


            <div className='container'>
                <div className="top-text">
                    <h2>BotaniScan</h2>
                    <p>Expert plant pathology and crop health diagnostics powered by advanced AI.</p>
                </div>
                <form action="" onSubmit={authHandler}>
                    <div className="navigator">
                        <p className={!signUp ? "active" : ""} onClick={() => setSignup(false)}>Login</p>
                        <p className={signUp ? "active" : ""} onClick={() => setSignup(true)}>Sign Up</p>
                    </div>
                    <div className="items">
                        {signUp && (
                            <fieldset>
                                <label htmlFor="">Name</label>
                                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder='john doe' />
                                <p><FaRegCircleUser /></p>

                            </fieldset>
                        )}
                        <fieldset>
                            <label htmlFor="">Work Email</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder='johndoe@gmail.com' />
                            <p><MdOutlineEmail /></p>

                        </fieldset>
                        <fieldset>
                            <div className="top">
                                <label htmlFor="">Password</label>
                                <p>Forgot Password</p>
                            </div>
                            <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPass ? "text" : "password"} placeholder='Password ' />
                            <div className="icons">
                                {<MdLockOutline />}
                                {showPass ? <FaRegEyeSlash onClick={() => setShowPass(false)} /> : <FaRegEye onClick={() => setShowPass(true)} />}
                            </div>
                        </fieldset>
                        {!loading && (
                            <button>{signUp ? "Create account" : "Access Dashboard"}</button>

                        )}
                        {loading && (
                            <button>
                                <Spinner height={20} width={20} />

                            </button>

                        )}
                        <div className="other">
                            <div></div>
                            <p>OR CONTINUE WITH</p>
                            <div></div>
                        </div>
                        <button type='button' onClick={() => loginBtn()} className='google-btn'>
                            {/* <GoogleLogin
                                onSuccess={handleSuccess}
                                onError={handleError}
                                theme='outline'
                                size='medium'
                                text='Continue with'

                            /> */}

                           Google
                        </button>
                    </div>
                </form>
            </div>



        </div>
    )
}

export default SignupLogin