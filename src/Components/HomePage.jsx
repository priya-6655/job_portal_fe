import React, { useContext, useEffect, useState } from 'react'
import './HomePage.css'
import { Link, useNavigate } from 'react-router-dom'
import HeaderCom from './HeaderCom'
import FooterCom from './FooterCom'
import { AuthContext } from './Context/AuthContext'

function HomePage({ showPlansOnly }) {
    const [showLogin, setShowLogin] = useState(false)
    const [showPlan, setShowPlan] = useState(false)
    const [viewPass, setViewPass] = useState(false)
    const { setCompany } = useContext(AuthContext)
    const [logData, setLogData] = useState({ email: '', password: '' })
    const navigate = useNavigate()

    useEffect(() => {
        if (showPlansOnly) {
            setShowPlan(true);
            setShowLogin(false);
        }
    }, [showPlansOnly]);


    const togglePassword = () => {
        setViewPass(!viewPass)
    }

    const paymentPage = () => {
        setShowPlan(true)
    }

    const getLogData = (e) => {
        setLogData({
            ...logData,
            [e.target.id]: e.target.value
        })
    }

    const handleSelection = (type) => {
        if (type === 'Employee Hiring') {
            setShowLogin(true)
            setShowPlan(false)
        } else if (type === 'Job Seeker') {
            navigate('/userLogin')
        }
        else {
            setShowLogin(false)
            setShowPlan(false)
        }
    }

    const loginCompany = async () => {
        try {
            const res = await fetch('http://192.168.29.106:3000/newCompany/companyLogin', {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(logData)
            })

            const out = await res.json()
            if (out.data) {
                const updatedRes = await fetch(`http://192.168.29.106:3000/newCompany/getCompany/${out.data.email}`)
                const updatedData = await updatedRes.json()
                setCompany(updatedData.data);
                setShowLogin(false)
                setShowPlan(false)
                navigate('/jobPostingPage');
            } else {
                alert(out.message)
            }
        } catch (error) {
            console.error(error); alert("Login failed")
        }
    }
    return (
        <>
            <HeaderCom onSelectType={handleSelection} />

            {!showPlan && !showLogin && (<div className='mainImg'></div>)}


            {showLogin && (
                <div className="login-background">
                    <div className='col-md-6 col-sm-12 py-3 login-box'>
                        <h5 className='text-center mb-5 fs-3 fw-bold text-info'>Login</h5>
                        <form>
                            <div className='mb-3 row mx-4'>
                                <label className='form-label col-sm-4'>Email</label>
                                <div className='col-sm-7'>
                                    <input type='email' className='form-control' id='email' value={logData.email} onChange={getLogData} />
                                </div>
                            </div>

                            <div className='mb-3 row mx-4'>
                                <label className='form-label col-sm-4'>Password</label>
                                <div className='col-sm-7 position-relative'>
                                    <input type={viewPass ? 'text' : 'password'} className='form-control' id='password' value={logData.password} onChange={getLogData} />
                                    <i className={`${viewPass ? 'bi bi-eye' : 'bi bi-eye-slash'} text-secondary`}
                                        style={{ cursor: 'pointer', position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)' }} onClick={togglePassword}></i>
                                </div>
                            </div>


                            <p className='text-center mt-5'>If you don't have an account <Link to='/companyReg'>Click here</Link> to SignIn</p>


                            <div className='d-flex align-items-center justify-content-center mt-5 mb-5'>
                                <button type='button' className='btn btn-info w-25 rounded' onClick={loginCompany}>Login</button>
                            </div>
                        </form >
                    </div >
                </div>
            )
            }

            {
                showPlan && (
                    <div className='container'>
                        <h3 className='text-center mt-5'>Choose the best plan for you.</h3>
                        <p className='text-center'>All of our plans unlock the full power of Programiz PROwith no hidden upgrades.</p>
                        <div className='row mt-3 justify-content-center'>

                            <div className='col-12 col-md-3 bordered rounded shadow-sm p-3'>
                                <h5>Monthly</h5>
                                <p>Best for choosing Value pack plan</p>
                                <hr style={{ color: 'gray' }}></hr>
                                <p className='fs-5 mt-2'><s style={{ color: 'red' }}>₹500</s></p>
                                <p className='mt-2'>₹199/month <br /> billed monthly </p>
                                <p className='offer mt-2'>₹301 savings</p>
                                <button type='button' className='btn btn-primary w-100 mt-2 mb-3' onClick={() => navigate('/paymentpage', { state: { plan: 'Monthly', amount: 199 } })}>Get Plan</button>
                            </div>

                            <div className='col-12 col-md-3 bordered rounded shadow-sm mt-3 mt-md-0 p-3'>
                                <h5>Yearly</h5>
                                <p>Best for choosing big plan</p>
                                <hr style={{ color: 'gray' }}></hr>
                                <p className='fs-5 mt-2'><s style={{ color: 'red' }}>₹5000</s></p>
                                <p className='mt-2'>₹1499/year <br /> billed monthly </p>
                                <p className='offer mt-2'>₹3499 savings</p>
                                <button type='button' className='btn btn-primary w-100 mt-2 mb-3' onClick={() => navigate('/paymentpage', { state: { plan: 'Yearly', amount: 1499 } })}>Get Plan</button>
                            </div>

                        </div>
                    </div>
                )
            }


            {
                !showPlan && (
                    <div className='container-fluid row justify-content-between p-4 mt-4 gap-3'>
                        <div className='col-sm-12 col-md-3 rounded py-4' style={{ backgroundColor: "rgba(191, 160, 124, 1)" }}>
                            <h5 className='text-center mb-3'>Hire Top Talent</h5>
                            <p>Post your job openings and connect with skilled professionals ready to grow with your team.</p>
                            <button className='btn btn-dark w-50 mt-2 mx-auto d-block' onClick={paymentPage}>Post a Job</button>
                        </div>
                        <div className='col-sm-12 col-md-3 rounded py-4' style={{ backgroundColor: "rgba(191, 160, 124, 1)" }}>
                            <h5 className='text-center'>Find Your Dream Job</h5>
                            <p>Explore thousands of openings across top companies. Apply and take the next step in your career.</p>
                            <button className='btn btn-dark w-50 mt-2 mx-auto d-block' onClick={() => navigate('/userLogin')}>Search Jobs</button>
                        </div>
                        <div className='col-sm-12 col-md-3 rounded py-4' style={{ backgroundColor: "rgba(191, 160, 124, 1)" }}>
                            <h5 className='text-center'>Join Our Network</h5>
                            <p>Stay updated with job alerts, hiring tips, and career guidance from industry experts.</p>
                            <button className='btn btn-dark w-50 mt-2 mx-auto d-block'>Join Now</button>
                        </div>
                    </div>
                )
            }

            <FooterCom />
        </>
    )
}

export default HomePage
