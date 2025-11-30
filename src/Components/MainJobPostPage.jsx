import React, { useContext, useEffect, useState } from 'react'
import HeaderCom from './HeaderCom'
import FooterCom from './FooterCom'
import PhoneInput from 'react-phone-input-2'
import { Link } from 'react-router-dom'
import { AuthContext } from './Context/AuthContext'
import HirePageGeading from './HirePageHeading'

function MainJobPostPage() {
    const { company } = useContext(AuthContext)
    const [agree, setAgree] = useState(false);
    const [showList, setShowList] = useState(false)
    const [skillList, setSkillList] = useState([])
    const [selectedSkill, setSelectedSkill] = useState([])
    const [showOtherInput, setShowOtherInput] = useState(false)
    const [cities, setCities] = useState([])
    const [otherSkill, setOtherSkill] = useState('')
    const [termsBox, setTermsBox] = useState(false)
    const [jobData, setJobData] = useState({
        jobtitle: '',
        openingcount: '',
        jobCity: '',
        candidateExp: '',
        minsalary: '',
        maxsalary: '',
        bonus: '',
        skill: '',
        companyName: company?.companyName,
        contactpersonName: '',
        phone: '',
        email: company?.email,
        employeeJoin: ''
    })

    useEffect(() => {
        fetch('http://192.168.29.106:3000/mainJob/job-cities')
            .then(res => res.json())
            .then(data => setCities(data.cityList))
            .catch(err => console.log(err))
    })

    const handleAddSkill = () => {
        if (jobData.skill.trim() !== "") {
            setSelectedSkill([...selectedSkill, jobData.skill.trim()])
            setJobData({ ...jobData, skill: '' })
        }
    }


    const handleJobDetails = (e) => {
        setJobData({
            ...jobData,
            [e.target.name]: e.target.value
        })
    }

    const handleSkillSearch = async (e) => {
        const inputValue = e.target.value

        setJobData({ ...jobData, skill: inputValue })

        if (inputValue.trim() === "") {
            setSkillList([])
            setShowList(false)
            return
        }

        const res = await fetch(`http://192.168.29.106:3000/mainJob/search-skill?q=${inputValue}`)
        const data = await res.json()
        setSkillList(data)
        setShowList(true)
    }


    const handleJobData = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('http://192.168.29.106:3000/mainJob/mainjobcreate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...jobData,
                    skill: selectedSkill,
                    companyId: company?.id,
                })
            })
            const data = await res.json();

            if (res.ok) {
                alert("Job Posted Successfully");
            } else {
                alert(data.message);
            }

            setJobData({
                jobtitle: '',
                openingcount: '',
                jobCity: '',
                candidateExp: '',
                minsalary: '',
                maxsalary: '',
                bonus: '',
                skill: '',
                companyName: company?.companyName,
                contactpersonName: '',
                phone: '',
                email: company?.email,
                employeeJoin: ''
            })
            setSelectedSkill([]);
            setShowOtherInput(false)
            setOtherSkill('')
            setSkillList([])
            setCities([])
            setShowList(false)
            setAgree(false)
        } catch (err) {
            console.log(err);
            alert("Something went wrong");
        }
    }

    const openTermsPage = (e) => {
        e.preventDefault()
        setTermsBox(true)
    }
    return (
        <>
            <HirePageGeading />
            <div className='container-fluid JobTheme py-4'>
                <div className={`d-flex justify-content-center ${termsBox ? "blur-background" : ''}`}>
                    <form className='form_box p-4'>
                        <h6 className='fw-bold text-primary text-decoration-underline mb-4'>Basic Job Details</h6>
                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label fw-semibold">Job Title</label>

                            <div className="col-sm-8">
                                <input type="text" className="form-control" required placeholder='Enter the job title' name='jobtitle' value={jobData.jobtitle} onChange={handleJobDetails} />
                            </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label fw-semibold">No Of Openings</label>

                            <div className="col-sm-8">
                                <input type="text" className="form-control" required placeholder='Eg. 2' name='openingcount' value={jobData.openingcount} onChange={handleJobDetails} />
                            </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label fw-semibold">Job City</label>

                            <div className="col-sm-8">
                                <select className='form-select' name='jobCity' required value={jobData.jobCity} onChange={handleJobDetails}>
                                    <option value="" disabled>Select City</option>
                                    {cities.map((item, index) => (
                                        <option key={index} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <h6 className='fw-bold text-primary text-decoration-underline mb-3 mt-3'>Candidate Requirement</h6>

                        <div className='row mb-3  align-items-center'>
                            <label className='col-sm-4 col-form-label fw-semibold'>Total Experience of Candidate</label>

                            <div className='col-sm-8 d-flex flex-wrap gap-4'>
                                <div className='form-check radio-item'>
                                    <input type='radio' name='candidateExp' className='form-check-input' id='fresher' value='fresher' checked={jobData.candidateExp === 'fresher'} onChange={handleJobDetails} />
                                    <label className='form-check-label' htmlFor='fresher'>Fresher Only</label>
                                </div>

                                <div className='form-check radio-item'>
                                    <input type='radio' name='candidateExp' className='form-check-input' id='exp' value='experience' checked={jobData.candidateExp === 'experience'} onChange={handleJobDetails} />
                                    <label className='form-check-label' htmlFor='exp'>Experience Only</label>
                                </div>

                                <div className='form-check radio-item'>
                                    <input type='radio' name='candidateExp' className='form-check-input' id='both' value='both' checked={jobData.candidateExp === 'both'} onChange={handleJobDetails} />
                                    <label className='form-check-label' htmlFor='both'>Both</label>
                                </div>
                            </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label fw-semibold">Monthly In-hand Salary</label>

                            <div className="col-sm-8">
                                <div className="row g-2 align-items-center">
                                    <div className="col-5">
                                        <input type="text" className="form-control" required placeholder='Eg. 10000' name='minsalary' value={jobData.minsalary} onChange={handleJobDetails} />
                                    </div>

                                    <div className="col-2 text-center fw-semibold">to</div>

                                    <div className="col-5">
                                        <input type="text" className="form-control" required placeholder='Eg. 20000' name='maxsalary' value={jobData.maxsalary} onChange={handleJobDetails} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className='row mb-3  align-items-center'>
                            <label className='col-sm-4 col-form-label fw-semibold'>Bonus in addition</label>

                            <div className='col-sm-8 d-flex flex-wrap gap-5'>
                                <div className='form-check radio-item'>
                                    <input type='radio' name='bonus' className='form-check-input' id='yes_bonus' value='yes_bonus' checked={jobData.bonus === 'yes_bonus'} onChange={handleJobDetails} />
                                    <label className='form-check-label' htmlFor='yes_bonus'>Yes</label>
                                </div>

                                <div className='form-check radio-item'>
                                    <input type='radio' name='bonus' className='form-check-input' id='no_bonus' value='no_bonus' checked={jobData.bonus === 'no_bonus'} onChange={handleJobDetails} />
                                    <label className='form-check-label' htmlFor='no_bonus'>No</label>
                                </div>
                            </div>
                        </div>

                        <div className='row mb-3 align-items-center'>
                            <label className='col-sm-4 col-form-label fw-semibold'>Skills</label>

                            <div className='col-sm-8 position-relative'>
                                <input type="text" className="form-control" required placeholder='Type to search for skills' name='skill' value={jobData.skill} onChange={handleSkillSearch} />
                                <button type='button' className='btn btn-info position-absolute p-2' style={{ right: '10px', top: '38%', transform: 'translateY(-50%)', width: '50px' }} onClick={handleAddSkill}>
                                    Add
                                </button>

                                {showList && skillList.length > 0 && (
                                    <ul id='result_Box' className='list-group mt-1 position-absolute w-50 z-3'>
                                        {skillList.map((itm, idx) => (
                                            <li key={idx} className='list-group-item list-group-item-action' onClick={() => {
                                                if (itm === 'other') {
                                                    setShowOtherInput(true)
                                                    setJobData({ ...jobData, skill: itm })
                                                } else {
                                                    setSelectedSkill([...selectedSkill, itm])
                                                    setShowOtherInput(false)
                                                }
                                                setShowList(false)
                                            }}
                                            >
                                                {itm}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                <div className='mt-2'>
                                    {selectedSkill.map((item, index) => (
                                        <span key={index} className='badge bg-primary me-2 p-2'>
                                            {item}
                                        </span>
                                    ))}
                                </div>

                                {showOtherInput && (
                                    <div className='mt-2'>
                                        <input type='text' className='form-control' placeholder='Enter Your Skill' value={otherSkill} onChange={(e) => setOtherSkill(e.target.value)} />
                                        <button
                                            type="button"
                                            className="btn btn-success mt-2"
                                            onClick={() => {
                                                if (otherSkill.trim() !== "") {
                                                    setSelectedSkill([...selectedSkill, otherSkill.trim()]);
                                                    setOtherSkill("");
                                                    setShowOtherInput(false);
                                                }
                                            }}
                                        >
                                            Add Skill
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>


                        <h6 className='fw-bold text-primary text-decoration-underline mb-4'>About Your Company</h6>
                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label fw-semibold">Company Name</label>

                            <div className="col-sm-8">
                                <input type="text" className="form-control" required placeholder='Eg. Absolute solution' name='companyName' value={jobData.companyName} onChange={handleJobDetails} disabled />
                            </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label fw-semibold">Contact Person</label>

                            <div className="col-sm-8">
                                <input type="text" className="form-control" required placeholder='Eg. Pradeep' name='contactpersonName' value={jobData.contactpersonName} onChange={handleJobDetails} />
                            </div>
                        </div>

                        <div className='mb-3 row'>
                            <label className='form-label col-sm-4 fw-semibold'>Phone Number</label>
                            <div className='col-sm-8'>
                                <PhoneInput
                                    country={'in'}
                                    inputClass="w-100"
                                    containerClass="w-100"
                                    inputStyle={{ width: '100%', height: '35px' }}
                                    buttonStyle={{ height: '35px' }}
                                    value={jobData.phone}
                                    onChange={(value) => setJobData({ ...jobData, phone: value })}
                                    placeholder="Enter phone number"
                                />
                            </div>
                        </div>

                        <div className="row mb-3 align-items-center">
                            <label className="col-sm-4 col-form-label fw-semibold">Email Id</label>

                            <div className="col-sm-8">
                                <input type="text" className="form-control" required placeholder='Eg. absolute@gmail.com' name='email' value={jobData.email} onChange={handleJobDetails} disabled />
                            </div>
                        </div>

                        <div className='row mb-3'>
                            <label className='form-label col-sm-4 fw-semibold'>How soon do you want to fill the position?</label>

                            <div className='col-sm-8 d-flex gap-4'>
                                <div className='form-check radio-item'>
                                    <input type='radio' name='employeeJoin' className='form-check-input' id='immediate' value="immediate" checked={jobData.employeeJoin === 'immediate'} onChange={handleJobDetails} />
                                    <label className='form-check-label' htmlFor='immediate'>Immediately</label>
                                </div>

                                <div className='form-check radio-item'>
                                    <input type='radio' name='employeeJoin' className='form-check-input' id='wait' value='wait' checked={jobData.employeeJoin === 'wait'} onChange={handleJobDetails} />
                                    <label className='form-check-label' htmlFor='wait'>Can Wait</label>
                                </div>
                            </div>
                        </div>

                    </form>
                </div>



                <div className='d-flex justify-content-center mt-5'>
                    <div className='terms_Box'>
                        <p>By submitting this job posting, I provide consent to be contacted by candidates, WorkIndia’s sales agents, and customer support via WhatsApp, SMS, phone calls, and email.</p>
                        <p>I understand that KYC verification is required and acknowledge the updated refund and privacy policies linked below.</p>

                        <div className='form-check'>
                            <input className='form-check-input' type='checkbox' checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                            <label className='form-check-label' for="flexCheckDefault">
                                I agree to the <Link onClick={openTermsPage}>Terms and Conditions,</Link> &nbsp;Privacy Policy, and consent to be contacted as described above.
                            </label>
                        </div>
                    </div>
                </div>

                <div className='d-flex justify-content-center mt-5'>
                    <button type='button' className='btn btn-primary w-25 rounded py-2' onClick={handleJobData} disabled={!agree}>Post Job Now</button>
                </div>

                {termsBox && (
                    <div className='overlay'>
                        <div className='terms-popup'>
                            <h4 className='mb-3'>Terms & Conditions</h4>
                            <p>Welcome to our Job Posting Platform. By creating a job post, you agree to comply with the following Terms & Conditions. Please read them carefully.</p>
                            <hr />
                            <ul>
                                <h5>1. Account Responsibility</h5>
                                <li>Employers must provide accurate company and contact details.</li>
                                <li>You are responsible for maintaining the confidentiality of your account login information.</li>
                                <li>Any activity conducted through your account is your responsibility.</li>
                            </ul>
                            <hr />
                            <ul>
                                <h5>2. Job Posting Rules</h5>
                                <p>Employers agree that all job posts:</p>
                                <li>Must be genuine job openings</li>
                                <li>Must not contain misleading, false, or exaggerated information</li>
                                <li>Must comply with all applicable labor laws and regulations</li>
                                <p>Prohibited job posts include:</p>
                                <li>Fake job listings</li>
                                <li>Discriminatory job descriptions</li>
                                <li>Jobs involving illegal activities</li>
                            </ul>
                            <hr />
                            <ul>
                                <h5>3. Payment (If Subscription Applies)</h5>
                                <li>All payments are final and non-refundable</li>
                                <li>Subscription benefits are provided based on the selected plan</li>
                                <li>We reserve the right to modify pricing and plan features</li>
                            </ul>
                            <hr />
                            <ul>
                                <h5>4. Service Usage</h5>
                                <li>We reserve the right to review, approve, edit, or remove any job post that violates our policies.</li>
                                <li>We may suspend or terminate accounts that misuse the platform.</li>
                            </ul>
                            <hr />
                            <ul>
                                <h5>5. Privacy</h5>
                                <p>Your data will be processed according to our Privacy Policy, including:</p>
                                <li>Storing job details</li>
                                <li>Displaying company information to job seekers</li>
                                <li>Communication with your provided email/phone</li>
                            </ul>
                            <hr />
                            <ul>
                                <h5>6. Content Ownership & Rights</h5>
                                <li>Employers are responsible for the content they submit.</li>
                                <li>By posting a job, you grant us permission to display, share, and promote your job post on our platform.</li>
                                <li>We do not own or claim responsibility for employer-uploaded content.</li>
                            </ul>
                            <hr />
                            <ul>
                                <h5>7. Modification of Terms</h5>
                                <p>We may update these Terms occasionally. Continued use of the platform means you accept the updated Terms.</p>
                            </ul>
                            <hr />
                            <ul>
                                <h5>8. Contact</h5>
                                <p>For any questions, contact our support team at:</p>
                                <li>
                                    <a href="mailto:support@example.com">support@example.com</a>
                                </li>
                            </ul>
                            <div className='d-flex justify-content-center mb-3 mt-5'>
                                <button className="btn btn-primary w-25" onClick={() => setTermsBox(false)}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <FooterCom />
        </>
    )
}

export default MainJobPostPage
