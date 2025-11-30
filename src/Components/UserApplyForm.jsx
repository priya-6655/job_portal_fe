import React, { useContext, useState } from 'react'
import UserHeading from './UserHeading'
import FooterCom from './FooterCom'
import './UserApplyForm.css'
import PhoneInput from 'react-phone-input-2'
import { AuthContext } from './Context/AuthContext'
import { useLocation } from 'react-router-dom'
import { API_BASE_URL } from '../config/api'

function UserApplyForm() {
    const { jobSeeker } = useContext(AuthContext)
    const { state } = useLocation();

    const [form, setForm] = useState({
        fname: jobSeeker?.fname || '',
        lname: jobSeeker?.lname || '',
        dob: '',
        email: '',
        phone: '',
        gender: '',
        city: '',
        exp: '',
        skill: '',
        resume: null,
        cLetter: ''
    })


    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append("companyId", state?.companyId || 0)
        formData.append("jobId", state?.jobId || 0)
        formData.append('userId', jobSeeker?.id || 0)
        console.log("Job Seeker Object:", jobSeeker);
        console.log("Job Seeker ID:", jobSeeker?.id);
        formData.append("fname", form.fname);
        formData.append("lname", form.lname);
        formData.append("dob", form.dob);
        formData.append("email", form.email);
        formData.append("phone", form.phone);
        formData.append("gender", form.gender);
        formData.append("city", form.city);
        formData.append("exp", form.exp);
        formData.append("skill", form.skill);
        formData.append("cLetter", form.cLetter);
        formData.append('resume', form.resume)

        if (!jobSeeker) {
            return <p className="text-center mt-5">Please login first to apply.</p>;
        }

        try {
            const res = await fetch(`${API_BASE_URL}/applyJob/apply`, {
                method: "POST",
                body: formData
            });

            const data = await res.json();

            if (res.ok) {
                alert("Application submitted successfully!");
                setForm({ fname: jobSeeker?.fname || '', lname: jobSeeker?.lname || '', dob: '', email: '', phone: '', gender: '', city: '', exp: '', skill: '', resume: null, cLetter: '' });
            } else {
                alert(data.message);
            }
        } catch (error) {
            alert("Something went wrong");
            console.log(error);
        }
    };

    return (
        <>
            <UserHeading />
            <div className='d-flex justify-content-center bg-form'>
                <div className='col-md-10 col-sm-12 bg-light mt-4 rounded mb-4'>
                    <form onSubmit={handleSubmit}>
                        <h4 className='text-center mb-4 fw-bold text-info'>Apply Form</h4>
                        <div className='row mx-5 mb-4'>
                            <div className='col-sm-3'>
                                <label className='col-form-label fw-semibold'>First Name</label>
                            </div>
                            <div className='col-sm-8'>
                                <input type='text' className='form-control' id='fname' required value={form.fname} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='row mx-5 mb-4'>
                            <div className='col-sm-3'>
                                <label className='col-form-label fw-semibold'>Last Name</label>
                            </div>
                            <div className='col-sm-8'>
                                <input type='text' className='form-control' id='lname' required value={form.lname} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='row mx-5 mb-4'>
                            <div className='col-sm-3'>
                                <label className='col-form-label fw-semibold'>DOB</label>
                            </div>
                            <div className='col-sm-8'>
                                <input type='date' className='form-control' id='dob' required value={form.dob} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='row mx-5 mb-4'>
                            <div className='col-sm-3'>
                                <label className='col-form-label fw-semibold'>Email</label>
                            </div>
                            <div className='col-sm-8'>
                                <input type='email' className='form-control' id='email' required value={form.email} onChange={handleChange} />
                            </div>
                        </div>

                        <div className='row mx-5 mb-4'>
                            <div className='col-sm-3'>
                                <label className='col-form-label fw-semibold'>Mobile</label>
                            </div>
                            <div className='col-sm-8'>
                                <PhoneInput
                                    country={'in'}
                                    inputClass="w-100"
                                    containerClass="w-100"
                                    inputStyle={{ width: '100%', height: '35px' }}
                                    buttonStyle={{ height: '35px' }}
                                    value={form.phone}
                                    onChange={(value) => setForm(prev => ({ ...prev, phone: value }))}
                                    placeholder="Enter phone number"
                                    required
                                />
                            </div>
                        </div>

                        <div className='row mx-5 mb-3'>
                            <div className='col-sm-3 fw-semibold'>
                                <label className='form-label'>Gender</label>
                            </div>
                            <div className='col-sm-9 d-flex gap-5'>
                                <div className='form-check'>
                                    <input type='radio' className='form-check-input' name='gender' id='male' value='male' checked={form.gender === 'male'} onChange={() => setForm(prev => ({ ...prev, gender: 'male' }))} />
                                    <label className='form-check-label' htmlFor='male'>Male</label>
                                </div>

                                <div className='form-check'>
                                    <input className='form-check-input' type='radio' name='gender' id='female' value='female' checked={form.gender === 'female'} onChange={() => setForm(prev => ({ ...prev, gender: 'female' }))} />
                                    <label className='form-check-label' htmlFor='female'>Female</label>
                                </div>
                            </div>
                        </div>

                        <div className="row mx-5 mb-3">
                            <div className='col-sm-3'>
                                <label className="col-sm-4 col-form-label fw-semibold">Location / City</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id='city' required value={form.city} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="row mx-5 mb-3">
                            <div className='col-sm-3'>
                                <label className="col-sm-4 col-form-label fw-semibold">Experience (Years)</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="number" className="form-control" required id='exp' value={form.exp} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="row mx-5 mb-3">
                            <div className='col-sm-3'>
                                <label className="col-sm-4 col-form-label fw-semibold">Skills</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" placeholder="e.g. HTML, CSS, JS" required id='skill' value={form.skill} onChange={handleChange} />
                            </div>
                        </div>

                        <div className="row mx-5 mb-3">
                            <div className='col-sm-3'>
                                <label className="col-sm-4 col-form-label fw-semibold">Resume (PDF)</label>
                            </div>
                            <div className="col-sm-8">
                                <input type="file" className="form-control" accept=".pdf" required id='resume' onChange={(e) => setForm(prev => ({ ...prev, resume: e.target.files[0] }))} />
                            </div>
                        </div>

                        <div className="row mx-5 mb-4">
                            <div className='col-sm-3'>
                                <label className="col-sm-4 col-form-label fw-semibold">Cover Letter</label>
                            </div>
                            <div className="col-sm-8">
                                <textarea rows="4" className="form-control" placeholder="Write something about yourself..." id='cLetter' value={form.cLetter || ''} onChange={handleChange}></textarea>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center'>
                            <button type='submit' className='btn btn-info w-25'>Apply</button>
                        </div>
                    </form>
                </div>
            </div>
            <FooterCom />
        </>
    )
}

export default UserApplyForm
