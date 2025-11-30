import React, { useContext, useState } from 'react'
import HeaderCom from './HeaderCom'
import FooterCom from './FooterCom'
import { Link, useNavigate } from 'react-router-dom'
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from 'react-phone-input-2'
import { AuthContext } from './Context/AuthContext';
import { API_BASE_URL } from '../config/api';

function CompanyReg() {
    const [viewPass, setViewPass] = useState(false)
    const [loading, setLoading] = useState(false)
    const { setCompany } = useContext(AuthContext)
    const navigate = useNavigate()
    const [regData, setRegdata] = useState({
        companyName: "",
        password: "",
        retypePass: "",
        email: "",
        phone: ""
    })


    const togglePassword = () => {
        setViewPass(!viewPass)
    }

    const getRegData = (e) => {
        setRegdata({
            ...regData,
            [e.target.id]: e.target.value
        })
    }

    const registerCompany = async () => {
        if (loading) return;
        setLoading(true)
        if (!regData.companyName || !regData.email || !regData.password || !regData.phone) {
            alert("All fields are mandatory");
            return;
        }
        if (regData.password !== regData.retypePass) {
            alert('Passwords do not match!')
            return
        }
        try {
            const res = await fetch(`${API_BASE_URL}/newCompany/companyReg`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(regData)
            })

            const out = await res.json()
            if (out.success) {
                setCompany({
                    companyName: regData.companyName,
                    email: regData.email
                })
                alert("Registered Successfully!");
                navigate('/')
            } else {
                alert(out.message || "Registration failed");
            }
        } catch {
            alert('Server error!')
        }
        setLoading(false)
    }
    return (
        <>
            <HeaderCom />
            <div className='RegContainer'>
                <div className='col-md-6 col-sm-12 py-3 login-box'>
                    <h5 className='text-center mb-5 fs-3 fw-bold text-info'>Register</h5>
                    <form>
                        <div className='mb-3 row mx-4'>
                            <label className='form-label col-sm-4'>Company Name</label>
                            <div className='col-sm-7'>
                                <input type='text' className='form-control' id='companyName' value={regData.companyName} onChange={getRegData} />
                            </div>
                        </div>

                        <div className='mb-3 row mx-4'>
                            <label className='form-label col-sm-4'>Password</label>
                            <div className='col-sm-7 position-relative'>
                                <input type={viewPass ? 'text' : 'password'} className='form-control' id='password' value={regData.password} onChange={getRegData} />
                                <i className={`${viewPass ? 'bi bi-eye' : 'bi bi-eye-slash'} text-secondary`}
                                    style={{ cursor: 'pointer', position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)' }} onClick={togglePassword}></i>
                            </div>
                        </div>

                        <div className='mb-3 row mx-4'>
                            <label className='form-label col-sm-4'>Re-Type Password</label>
                            <div className='col-sm-7 position-relative'>
                                <input type={viewPass ? 'text' : 'password'} className='form-control' id='retypePass' value={regData.retypePass} onChange={getRegData} />
                                <i className={`${viewPass ? 'bi bi-eye' : 'bi bi-eye-slash'} text-secondary`}
                                    style={{ cursor: 'pointer', position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)' }} onClick={togglePassword}></i>
                            </div>
                        </div>

                        <div className='mb-3 row mx-4'>
                            <label className='form-label col-sm-4'>Email</label>
                            <div className='col-sm-7'>
                                <input type='email' className='form-control' id='email' value={regData.email} onChange={getRegData} />
                            </div>
                        </div>

                        <div className='mb-3 row mx-4'>
                            <label className='form-label col-sm-4'>Phone Number</label>
                            <div className='col-sm-7'>
                                <PhoneInput
                                    country={'in'}
                                    inputClass="w-100"
                                    containerClass="w-100"
                                    inputStyle={{ width: '100%', height: '35px' }}
                                    buttonStyle={{ height: '35px' }}
                                    value={regData.phone}
                                    onChange={(value) => setRegdata({ ...regData, phone: value })}
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>


                        <p className='text-center mt-5'>If you have an account <Link to='/'>Click here</Link> to SignIn</p>


                        <div className='d-flex align-items-center justify-content-center mt-5 mb-5'>
                            <button type='button' className='btn btn-info w-25 rounded' onClick={registerCompany} disabled={loading}>{loading ? "Please Wait" : "Register"}</button>
                        </div>
                    </form >
                </div >
            </div>
            <FooterCom />
        </>
    )
}

export default CompanyReg
