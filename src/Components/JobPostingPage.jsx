import React, { useContext, useState } from 'react'
import HeaderCom from './HeaderCom'
import FooterCom from './FooterCom'
import './JobPostingPage.css'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import HirePageGeading from './HirePageHeading'

function JobPostingPage() {
    const [jobPosting, setJobPosting] = useState(false)
    const { company } = useContext(AuthContext)
    const navigate = useNavigate()
    const [companyInfo, setCompanyInfo] = useState({ companyName: company?.companyName, employeeCount: '', employeeHire: '', employeeJoin: '' })

    const JobPostingForm = () => {
        if (!company || !company?.isSubscribed) {
            alert("You have not subscribed to any plan. Please subscribe to create a job post.");
            navigate('/plans')
            return;
        }
        setJobPosting(true)
    }

    const getCompanyInfo = (e) => {
        setCompanyInfo({
            ...companyInfo,
            [e.target.name]: e.target.value
        })
    }

    const sendjobPost = async () => {
        if (!companyInfo.employeeCount || !companyInfo.employeeHire || !companyInfo.employeeJoin) {
            alert("Please fill all fields");
            return;
        }

        try {
            const res = await fetch('http://192.168.29.106:3000/createJob/jobPosting', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    companyId: company?.id,
                    employeeCount: companyInfo.employeeCount,
                    employeeHire: companyInfo.employeeHire,
                    employeeJoin: companyInfo.employeeJoin
                })
            })

            const result = await res.json()

            if (res.ok) {
                alert('Job posted successfully!')
                navigate('/mainjobpost')
            } else {
                alert(result.message || "Failed to post job");
            }
        } catch (error) {
            console.log(error);
            alert("Server error while posting job");
        }
    }


    return (
        <>
            <HirePageGeading />
            {!jobPosting && (
                <div className='container-fluid jobImage'>
                    <div className='col-sm-8 col-md-4 job-create'>
                        <p>If you want to create ypur job click the below button</p>
                        <button type='button' className='btn btn-info w-50 mx-5' onClick={JobPostingForm}>Create Job</button>
                    </div>
                </div>
            )}

            {jobPosting && (
                <div className='container-fluid d-flex justify-content-center align-items-center py-4 createJob'>
                    <div className='row shadow-lg rounded-4 overflow-hidden bg-white' style={{ maxWidth: '900px', width: '100%' }}>
                        <div className='col-md-6 col-sm-12 job-form-box p-4'>
                            <h5 className='fw-bold mx-2'>Let's begin hiring</h5>
                            <p className='mx-2'>Register and create a job post within 2 minutes!</p>
                            <form>
                                <div className='row mb-3 mx-2'>
                                    <label className='form-label mb-2 w-100'>Company name</label>
                                    <div className='col-sm-12'>
                                        <input type='text' name='companyName' className='form-control' id='companyName' value={companyInfo.companyName} onChange={getCompanyInfo} disabled />
                                    </div>
                                </div>

                                <div className='row mb-3 mx-2'>
                                    <label className='form-label mb-2 w-100'>Number of employees</label>

                                    <div className='col-12 d-flex gap-4'>
                                        <div className='form-check radio-item'>
                                            <input type='radio' name='employeeCount' className='form-check-input' id='empCount1' value='1-10' onChange={getCompanyInfo} />
                                            <label className='form-check-label' htmlFor='empCount1'>1-10</label>
                                        </div>

                                        <div className='form-check radio-item'>
                                            <input type='radio' name='employeeCount' className='form-check-input' id='empCount2' value='11-50' onChange={getCompanyInfo} />
                                            <label className='form-check-label' htmlFor='empCount2'>11-50</label>
                                        </div>

                                        <div className='form-check radio-item'>
                                            <input type='radio' name='employeeCount' className='form-check-input' id='empCount3' value='51-100' onChange={getCompanyInfo} />
                                            <label className='form-check-label' htmlFor='empCount3'>51-100</label>
                                        </div>

                                        <div className='form-check radio-item'>
                                            <input type='radio' name='employeeCount' className='form-check-input' id='empCount4' value='100+' onChange={getCompanyInfo} />
                                            <label className='form-check-label' htmlFor='empCount4'>More than 100</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='row mb-3 mx-2'>
                                    <label className='form-label mb-2 w-100'>How many People did you hire in last year?</label>

                                    <div className='col-12 d-flex gap-4'>
                                        <div className='form-check radio-item'>
                                            <input type='radio' name='employeeHire' className='form-check-input' id='empHire1' value='1-3' onChange={getCompanyInfo} />
                                            <label className='form-check-label' htmlFor='empHire1'>1-3</label>
                                        </div>


                                        <div className='form-check radio-item'>
                                            <input type='radio' name='employeeHire' className='form-check-input' id='empHire2' value='4-10' onChange={getCompanyInfo} />
                                            <label className='form-check-label' htmlFor='empHire2'>4-10</label>
                                        </div>

                                        <div className='form-check radio-item'>
                                            <input type='radio' name='employeeHire' className='form-check-input' id='empHire3' value='11-25' onChange={getCompanyInfo} />
                                            <label className='form-check-label' htmlFor='empHire3'>11-25</label>
                                        </div>

                                        <div className='form-check radio-item'>
                                            <input type='radio' name='employeeHire' className='form-check-input' id='empHire4' value='25+' onChange={getCompanyInfo} />
                                            <label className='form-check-label' htmlFor='empHire4'>More than 25</label>
                                        </div>
                                    </div>
                                </div>

                                <div className='row mb-3 mx-2'>
                                    <label className='form-label mb-2 w-100'>How soon do you want to fill the position?</label>

                                    <div className='col-12 d-flex gap-4'>
                                        <div className='form-check radio-item'>
                                            <input type='radio' name='employeeJoin' className='form-check-input' id='immediate' value="immediate" onChange={getCompanyInfo} />
                                            <label className='form-check-label' htmlFor='immediate'>Immediately</label>
                                        </div>

                                        <div className='form-check radio-item'>
                                            <input type='radio' name='employeeJoin' className='form-check-input' id='wait' value='wait' onChange={getCompanyInfo} />
                                            <label className='form-check-label' htmlFor='wait'>Can Wait</label>
                                        </div>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-center'>
                                    <button type='button' className='btn btn-info w-75 mx-2 mt-3' onClick={sendjobPost}>Create Job</button>
                                </div>
                            </form>
                        </div>

                        <div className='col-md-6 text-white p-4 right-box'>
                            <h4 className='fw-bold'>Fast Grow</h4>
                            <p>India's Largest Job Portal</p>

                            <h5 className="fw-bold mt-3">Trusted by</h5>
                            <h2 className="fw-bold">38,00,000+ Employers!</h2>

                            <ul className='mt-3'>
                                <li>Gain Access to 3.5 Crore Active Job Seekers</li>
                                <li>Get Call & WhatsApp Leads from Candidates</li>
                                <li>Unlock Resumes with Our Database Feature</li>
                            </ul>

                            <img src="https://static.vecteezy.com/system/resources/previews/036/497/723/original/ai-generated-happy-indian-business-team-standing-arms-crossed-isolated-on-transparent-background-png.png"
                                alt="team" className="img-fluid mt-4" />
                        </div>
                    </div>
                </div>
            )}
            <FooterCom />
        </>
    )
}

export default JobPostingPage
