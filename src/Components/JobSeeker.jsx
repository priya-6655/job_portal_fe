import React, { useContext, useState } from 'react'
import HeaderCom from './HeaderCom'
import FooterCom from './FooterCom'
import './JobSeeker.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'


function JobSeeker() {
    const { setJobSeeker } = useContext(AuthContext)
    const [showPass, setShowPass] = useState(false)
    const [userReg, setUserReg] = useState(false)
    const [usrRegData, setUsrRegData] = useState({ fname: '', lname: '', mobile: '', usrname: '', pass: '', gender: '' })
    const [loginData, setLoginData] = useState({ usrname: '', pass: '' });
    const navigate = useNavigate()

    const togglePassword = () => {
        setShowPass(!showPass)
    }

    const openRegBox = () => {
        setUserReg(!userReg)
    }

    const handleSelection = (type) => {
        if (type === 'Employee Hiring') {
            setUserReg(false)
        }
        else if (type === 'Job Seeker') {
            setUserReg(false)
        }
        else {
            setUserReg(false)
        }
    }

    const handleRegister = (e) => {
        setUsrRegData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const userRegister = async (e) => {
        e.preventDefault()

        const res = await fetch('http://192.168.29.106:3000/jobseeker/newUser', {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(usrRegData)
        })

        const data = await res.json()

        if (res.ok) {
            const user = data.user;

            setJobSeeker({
                id: user.id,
                fname: user.fname,
                lname: user.lname
            });

            localStorage.setItem('jobSeeker', JSON.stringify({
                id: user.id,
                fname: user.fname,
                lname: user.lname
            }));

            alert('Registered Successfully')
            setUserReg(false)
            setUsrRegData({
                fname: '',
                lname: '',
                mobile: '',
                usrname: '',
                pass: '',
                gender: ''
            })
        } else {
            alert(data.message)
        }
    }

    const handleUserLog = (e) => {
        setLoginData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleLogin = async (e) => {
        e.preventDefault()

        const res = await fetch('http://192.168.29.106:3000/jobseeker/usrLogin', {
            method: 'POST',
            headers: { 'content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        })

        const data = await res.json()
        console.log("Login API Response:", data);

        if (res.ok) {
            const user = data.user;

            setJobSeeker({
                id: user.id,
                fname: user.fname,
                lname: user.lname
            });


            localStorage.setItem('jobSeeker', JSON.stringify({
                id: user.id,
                fname: user.fname,
                lname: user.lname
            }));

            alert('Login Successful');
            navigate('/jobListing');
        } else {
            alert(data.message || "Login failed")
        }


    }
    return (
        <>
            <HeaderCom onSelectType={handleSelection} />
            {!userReg && (
                <div className='container-fluid userImage'>
                    <div className='col-sm-6 col-md-4 loginBox'>
                        <h4 className='text-center mb-4 text-success fw-bold mt-4'>Login</h4>
                        <form className='col-md-12 p-4 rounded'>
                            <div className='row align-items-center mb-3'>
                                <div className='col-md-5 fw-bold'>
                                    <label className='form-label'>User Name:</label>
                                </div>
                                <div className='col-md-6'>
                                    <input type='text' className='form-control' name='usrname' value={loginData.usrname} onChange={handleUserLog} />
                                </div>
                            </div>

                            <div className='row align-items-center mb-3'>
                                <div className='col-md-5 fw-bold'>
                                    <label className='form-label'>Password:</label>
                                </div>

                                <div className='col-md-6 position-relative'>
                                    <input type={showPass ? 'text' : 'password'} className='form-control' name='pass' value={loginData.pass} onChange={handleUserLog} />
                                    <i className={`${showPass ? 'bi bi-eye' : 'bi bi-eye-slash '} position-absolute top-50 end-0 translate-middle-y me-4 text-secondary`}
                                        style={{ cursor: 'pointer' }} onClick={togglePassword}></i>
                                </div>
                            </div>

                            <div className='d-flex flex-row  mt-5 justify-content-evenly'>
                                <p className='fw-bold'>New user</p>
                                <i className="bi bi-person-circle"></i>
                                <p className='text-primary' style={{ cursor: 'pointer' }} onClick={openRegBox}>Register Here</p>
                            </div>

                            <div className='d-flex justify-content-center mt-3'>
                                <button type='submit' className='btn btn-success' onClick={handleLogin}>Login</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}



            {userReg && (
                <div className='container-fluid regImage'>
                    <div className='col-sm-12 col-md-4 loginBox'>
                        <h4 className='text-center mb-4 text-success fw-bold mt-4'>Register</h4>
                        <form className='col-md-12 p-4 rounded' onSubmit={userRegister}>
                            <div className='row align-items-center mb-3'>
                                <div className='col-md-5 text-light fw-bold'>
                                    <label className='form-label'>First Name:</label>
                                </div>
                                <div className='col-md-6'>
                                    <input type='text' className='form-control' name='fname' value={usrRegData.fname} onChange={handleRegister} />
                                </div>
                            </div>

                            <div className='row align-items-center mb-3'>
                                <div className='col-md-5 text-light fw-bold'>
                                    <label className='form-label'>Last Name:</label>
                                </div>
                                <div className='col-md-6'>
                                    <input type='text' className='form-control' name='lname' value={usrRegData.lname} onChange={handleRegister} />
                                </div>
                            </div>

                            <div className='row align-items-center mb-3'>
                                <div className='col-md-5 text-light fw-bold'>
                                    <label className='form-label'>Mobile:</label>
                                </div>
                                <div className='col-md-6'>
                                    <input type='text' className='form-control' name='mobile' value={usrRegData.mobile} onChange={handleRegister} />
                                </div>
                            </div>

                            <div className='row align-items-center mb-3'>
                                <div className='col-md-5 text-light fw-bold'>
                                    <label className='form-label'>User Name:</label>
                                </div>
                                <div className='col-md-6'>
                                    <input type='text' className='form-control' name='usrname' value={usrRegData.usrname} onChange={handleRegister} />
                                </div>
                            </div>

                            <div className='row align-items-center mb-3'>
                                <div className='col-md-5 text-light fw-bold'>
                                    <label className='form-label'>Password:</label>
                                </div>

                                <div className='col-md-6 position-relative'>
                                    <input type={showPass ? 'text' : 'password'} className='form-control' name='pass' value={usrRegData.pass} onChange={handleRegister} />
                                    <i className={`${showPass ? 'bi bi-eye' : 'bi bi-eye-slash '} position-absolute top-50 end-0 translate-middle-y me-4 text-secondary`}
                                        style={{ cursor: 'pointer' }} onClick={togglePassword}></i>
                                </div>
                            </div>

                            <div className='row align-items-center mb-3'>
                                <div className='col-md-5 text-light fw-bold'>
                                    <label className='form-label'>Gender:</label>
                                </div>
                                <div className='col-md-6 d-flex gap-3'>
                                    <div className='form-check'>
                                        <input type='radio' className='form-check-input' name='gender' id='male' value='male' checked={usrRegData.gender === 'male'} onChange={handleRegister} />
                                        <label className='form-check-label text-light' htmlFor='male'>Male</label>
                                    </div>

                                    <div className='form-check'>
                                        <input className='form-check-input' type='radio' name='gender' id='female' value='female' checked={usrRegData.gender === 'female'} onChange={handleRegister} />
                                        <label className='form-check-label text-light' htmlFor='female'>Female</label>
                                    </div>
                                </div>
                            </div>

                            <p className='text-primary text-center mt-3' style={{ cursor: 'pointer' }} onClick={() => setUserReg(false)}>
                                Already have an account? Login here
                            </p>

                            <div className='d-flex justify-content-center mt-3'>
                                <button type='submit' className='btn btn-success'>Register</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            <FooterCom />
        </>
    )
}

export default JobSeeker
