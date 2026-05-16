import React from 'react'
import "./footer.css"
import { FaGithub } from 'react-icons/fa6'
import { TbMailForward } from 'react-icons/tb'
import { BsPersonHeart } from 'react-icons/bs'
const Footer = () => {
    const now = Date.now()

    return (
        <footer>
            <div className="left">
                <p>BotaniScan</p>
                <p>&copy;{new Date(now).getFullYear()} BotaniScan AI. Empowering sustainable agriculture.</p>
            </div>
            <div className="right">
                <ul>
                    <a href="" target='_blank'><li><TbMailForward /> Privacy Policy</li></a>
                    <a href="https://github.com/Prince-Bhattrai" target='_blank'>  <li><FaGithub /> Github</li> </a>
                    <a href='https://princebhattrai.vercel.app/' target='_blank'> <li><BsPersonHeart /> My portfolio</li> </a>
                </ul>
            </div>
        </footer>
    )
}

export default Footer