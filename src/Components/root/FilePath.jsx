import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../HomePage'
import PaymentPage from '../PaymentPage'
import JobSeeker from '../JobSeeker'
import JobPostingPage from '../JobPostingPage'
import CompanyReg from '../CompanyReg'
import MainJobPostPage from '../MainJobPostPage'
import JobListingPage from '../JobListingPage'
import UserApplyForm from '../UserApplyForm'
import EditProfile from '../EditProfile'
import MyApllication from '../MyApllication'
import ViewUserApplication from '../ViewUserApplication'

function FilePath() {
    return (
        <div>
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/paymentpage' element={<PaymentPage />} />
                <Route path='/userLogin' element={<JobSeeker />} />
                <Route path='/jobPostingPage' element={<JobPostingPage />} />
                <Route path='/companyReg' element={<CompanyReg />} />
                <Route path="/plans" element={<HomePage showPlansOnly={true} />} />
                <Route path='/mainjobpost' element={<MainJobPostPage />} />
                <Route path='/jobListing' element={<JobListingPage />} />
                <Route path='/applyform' element={<UserApplyForm />} />
                <Route path='/editprofile' element={<EditProfile />} />
                <Route path='/myapplication' element={<MyApllication />} />
                <Route path='/userApplyDetails' element={<ViewUserApplication />} />
            </Routes>
        </div>
    )
}

export default FilePath
