import React, { useContext, useEffect, useState } from 'react'
import UserHeading from './UserHeading'
import FooterCom from './FooterCom'
import { AuthContext } from './Context/AuthContext'

function MyApllication() {
    const { jobSeeker } = useContext(AuthContext)
    const [applications, setApplications] = useState([])

    useEffect(() => {
        if (!jobSeeker?.id) return
        fetch(`http://192.168.29.106:3000/applyJob/userApplications/${jobSeeker.id}`)
            .then(res => res.json())
            .then(data => {
                const list = data.applications || [];
                setApplications(list);
            });
    }, [jobSeeker?.id])
    return (
        <>
            <UserHeading />
            <div className='container-fluid bg-light'>
                <div className="application-list">
                    {applications.length === 0 ? (
                        <p>You have not applied for any jobs.</p>
                    ) : (
                        applications.map((item) => (
                            <div className="application-card" key={item.applyId}>
                                <h3>{item?.companyName ?? "Company name not available"}</h3>
                                <p>Applied Position: {item?.jobTitle ?? "Not specified"}</p>
                                <p style={{ textTransform: 'capitalize' }}>City: {item?.jobCity || 'N/A'}</p>
                                <a href={`http://192.168.29.106:3000/uploads/${item.resume}`} target="_blank">
                                    View Resume
                                </a>
                            </div>
                        ))
                    )}
                </div>
            </div>
            <FooterCom />
        </>
    )
}

export default MyApllication
