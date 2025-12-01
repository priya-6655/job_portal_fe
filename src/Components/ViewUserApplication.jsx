import React, { useContext, useEffect, useState } from 'react'
import HirePageHeading from './HirePageHeading.jsx'
import FooterCom from './FooterCom'
import { API_BASE_URL } from '../config/api'
import { AuthContext } from './Context/AuthContext'

function ViewUserApplication() {
    const [applications, setApplications] = useState([])
    const { company } = useContext(AuthContext)

    useEffect(() => {
        if (!company?.id) return
        const fetchApplications = async () => {
            try {
                const res = await fetch(`${API_BASE_URL}/applyJob/userApplyDetails/${company.id}`)
                const data = await res.json()
                setApplications(data.userApplications || [])
            } catch (err) {
                console.log(err)
            }
        }

        fetchApplications()
    }, [company])


    return (
        <>
            <HirePageHeading />
            <div className='container mt-4'>
                {applications.length === 0 ? (
                    <p>No applications found</p>
                ) : (
                    <table className='table table-bordered'>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Experience</th>
                                <th>Skills</th>
                                <th>Resume</th>
                            </tr>
                        </thead>
                        <tbody>
                            {applications.map(app => (
                                <tr key={app.applyId}>
                                    <td>{app.fname} {app.lname}</td>
                                    <td>{app.email}</td>
                                    <td>{app.phone}</td>
                                    <td>{app.exp}</td>
                                    <td>{app.skill}</td>
                                    <td>
                                        {app.resume ? <a href={app.resume} target="_blank" rel="noopener noreferrer">View</a> : 'No Resume'}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <FooterCom />
        </>
    )
}

export default ViewUserApplication
