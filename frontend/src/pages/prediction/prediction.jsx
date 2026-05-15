import React, { useContext, useEffect, useState } from 'react'
import "./prediction.css"
import { IoTodayOutline, IoWarningOutline } from 'react-icons/io5'
import { MdOutlineUploadFile } from 'react-icons/md'
import { AppContext } from '../../context/AppContext'
import { TiTick } from 'react-icons/ti'
import { FaLeaf } from 'react-icons/fa6'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Notfound from '../../components/notfound/notfound'
import Spinner from '../../components/spinner/spinner'

const Prediction = () => {
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const { history, setHistory, token } = useContext(AppContext)

  const navigate = useNavigate()


  const recentItem = history
    .filter((h) => {
      const createdTime = new Date(h.createdAt).getTime()
      const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000

      return createdTime > oneDayAgo
    })
    .slice(0, 2)

  const crops = [...new Set(history.map((h) => h.plant))]

  const percentage = history.length
    ? ((recentItem.length / history.length) * 100).toFixed(1)
    : 0

  const predict = async () => {
    setLoading(true)
    if (!image) {
      setLoading(false)
      return toast.error("Please upload a leaf image", { theme: "dark" })

    }

    try {
      const token = localStorage.getItem("token")

      if (!token) {
        setLoading(false)
        return toast.error("Unauthorized", { theme: "dark" })
      }

      const formData = new FormData()

      formData.append("image", image)

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/v1/api/history/predict`,
        formData,
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
        setHistory((prev) => [response.data.prediction, ...prev])

        toast.success("Prediction completed!", { theme: "dark" })

        return navigate(`/prediction/${response.data.prediction._id}`)
      }

    } catch (error) {
      setLoading(false)
      console.log(error)

      return toast.error(
        error.response?.data?.message || "Something went wrong!",
        { theme: "dark" }
      )
    }
  }



  return (
    <div className='prediction'>
      <div className="about">
        <h1>Leaf Analysis Dashboard</h1>

        <p>
          Instant AI-powered crop diagnostics. Upload a clear photo of a leaf to detect diseases and receive expert treatment recommendations.
        </p>
      </div>

      <div className="page">

        <div className="left">

          <div className="box">
            <p><IoTodayOutline />Today's Scans</p>

            <p>{recentItem.length}</p>

            <p>+{percentage}% from yesterday</p>
          </div>

          <div className="box">
            <p><FaLeaf /> Active Crops</p>

            {crops.length === 0 && (
              <p>No active crops found!</p>
            )}

            {crops.map((v) => (
              <p key={v}>{v}</p>
            ))}
          </div>

        </div>

        <div className="center">

          <div className="input-box">

            <label htmlFor="image">

              {!image && (
                <>
                  <p className='icon'>
                    <MdOutlineUploadFile />
                  </p>

                  <div className="about-image">
                    <p>Drop leaf photo here</p>
                    <p>Support JPG, PNG files up to 10MB</p>
                  </div>
                </>
              )}

              {image && (
                <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                />
              )}

              {!image && (
                <p className='browse'>Browse Files</p>
              )}

            </label>

            {image && !loading && (
              <p
                onClick={predict}
                style={{
                  marginTop: "30px",
                  display: "flex",
                  alignItems: 'center',
                  justifyContent: "center",
                  cursor: "pointer"
                }}
                className='browse'
              >
                Upload file
              </p>
            )}
            {loading && (
              <p className='browse' style={{
                marginTop: "30px",
                display: "flex",
                alignItems: 'center',
                justifyContent: "center",
                cursor: "pointer"
              }}><Spinner height={30} width={30} /></p>
            )}

            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id='image'
              accept='image/*'
            />

          </div>

          <div className="tips">
            <p></p>

            <div className="tips-text">
              <p>Best Results Tip</p>

              <p>
                Ensure the leaf is in focus, well-lit, and against a neutral background for 99.2% accuracy.
              </p>
            </div>
          </div>

        </div>

        <div className="right">

          <div className="recent-box">

            <p>Recent Findings</p>

            {recentItem.length === 0 && (
              <p>No recent item found!</p>
            )}

            {recentItem.map((v) => (
              <div style={{ cursor: "pointer" }} key={v._id} className="recent-data" onClick={() => navigate(`/prediction/${v._id}`)}>

                <p className={v.disease !== "healthy" ? "dis" : "hel"}>
                  {v.disease !== "healthy"
                    ? <IoWarningOutline />
                    : <TiTick />
                  }
                </p>

                <div className="data">
                  <div className="1th">
                    <p>{v.plant} </p>
                    <p>{v.disease.slice(0, 10)}...</p>
                  </div>

                  <p>
                    {new Date(v.createdAt).toLocaleString()}
                  </p>
                </div>

              </div>
            ))}

            <button onClick={() => navigate("/history")}>View Full History</button>

          </div>

          <div className="help">
            <p>Need Help?</p>

            <p>
              Chat with our agronomist AI for specific treatment plans.
            </p>

            <button>Ask BotaniAI</button>
          </div>

        </div>

      </div>

    </div>
  )
}

export default Prediction