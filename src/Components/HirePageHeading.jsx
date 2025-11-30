import React, { useState } from 'react'
import './UserHeading.css'
import { useNavigate } from 'react-router-dom'

function HirePageGeading() {
    const [openPanel, setOpenPanel] = useState(false)
    const navigate = useNavigate()

    const togglePanel = () => {
        setOpenPanel(true)
    }

    const closePanel = () => {
        setOpenPanel(false)
    }

    const userLogOut = () => {
        navigate('/')
    }

    return (
        <>
            <div className='container-fluid header d-flex align-items-center p-2 shadow-sm '>
                <img src='https://static.vecteezy.com/system/resources/thumbnails/019/879/186/small/user-icon-on-transparent-background-free-png.png' className='jobLogo me-2' style={{ cursor: 'pointer' }} onClick={togglePanel} />
                <div className='d-flex align-items-center justify-content-center flex-grow-1'>
                    <img src='https://img.pikbest.com/png-images/20241023/vintage-bird-logo-for-eco-friendly-products_10996346.png!sw800' className='jobLogo me-2' />
                    <h4 className='m-0 fw-bold'>Fast Grow Job Portal</h4>
                    <img src='https://img.pikbest.com/png-images/20241023/vintage-bird-logo-for-eco-friendly-products_10996346.png!sw800' className='jobLogo me-2' style={{ transform: 'scaleX(-1)' }} />
                </div>
            </div>

            <div className='container-fluid scroll-text'>
                🚀 Fast Grow Job Portal — Find Your Dream Job Today! 💼 Explore Thousands of
                Opportunities, Apply Instantly, and Start Your Career Journey with Us!
            </div>

            {openPanel && (
                <div className="side-panel">
                    <span className="close-btn" onClick={closePanel}>×</span>
                    <h5 className="fw-bold mb-3">My Account</h5>
                    <p className="panel-item" >My Profile</p>
                    <p className="panel-item">User Applications</p>
                    <p className="panel-item">Settings</p>
                    <p className="panel-item text-danger" style={{ cursor: 'pointer' }} onClick={userLogOut}>
                        Logout
                    </p>
                </div>
            )}
        </>
    )
}

export default HirePageGeading
