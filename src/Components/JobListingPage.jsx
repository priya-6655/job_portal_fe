import React, { useEffect, useState } from 'react'
import UserHeading from './UserHeading'
import FooterCom from './FooterCom'
import { useNavigate } from 'react-router-dom';

function JobListingPage() {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {
        fetch('http://192.168.29.106:3000/mainJob/joblist')
            .then(res => res.json())
            .then(data => {
                console.log("API Response:", data);
                setJobs(data);
            })
            .catch(err => console.log(err));
    }, [])

    const openApplyForm = (jobId, companyId) => {

        navigate('/applyform', { state: { jobId, companyId } })
    }
    return (
        <div>
            <UserHeading />
            <div className='container-fluid bg-light'>
                <h4 className='fw-bold mb-3 text-center'>Available Jobs</h4>

                {jobs.length === 0 ? (
                    <p>No job found.</p>
                ) : (
                    jobs.map((item, index) => (
                        <div key={index} className='card mb-3 shadow-sm p-3'>
                            <h5 className='fw-bold'>{item.jobtitle}</h5>
                            <p className='m-0'>City: {item.jobCity}</p>
                            <p className='m-0'>Experience: {item.candidateExp}</p>
                            <p className='m-0'>Salary: {item.minsalary} - {item.maxsalary}</p>
                            <p className='m-0'>Skills: {item.skill?.split(',').join(', ')}</p>

                            <hr />

                            <h6 className='fw-bold text-primary'>Company Details</h6>
                            <p className='m-0'>Name: {item.companyreg?.companyName}</p>
                            <p className='m-0'>Email: {item.companyreg?.email}</p>
                            <p className='m-0'>Phone: {item.companyreg?.phone}</p>

                            <div className='d-flex justify-content-center'>
                                <button type='button' className='btn btn-info w-25' onClick={() => openApplyForm(item?.JobId, item?.companyId)}>Apply</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <FooterCom />
        </div>
    )
}

export default JobListingPage
