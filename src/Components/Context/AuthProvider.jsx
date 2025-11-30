import React, { useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

function AuthProvider({ children }) {
    const [company, setCompany] = useState(() => {
        const saved = localStorage.getItem('companyData');
        return saved ? JSON.parse(saved) : null;
    })

    const [jobSeeker, setJobSeeker] = useState(() => {
        const saved = localStorage.getItem('jobSeeker');
        return saved ? JSON.parse(saved) : null
    })
    useEffect(() => {
        if (company) {
            localStorage.setItem('companyData', JSON.stringify(company));
        }

        if (jobSeeker) {
            localStorage.setItem('jobSeeker', JSON.stringify(jobSeeker))
        }
    }, [company, jobSeeker]);

    return (
        <AuthContext.Provider value={{ company, setCompany, jobSeeker, setJobSeeker }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
