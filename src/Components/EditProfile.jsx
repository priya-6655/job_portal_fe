import React, { useState, useEffect } from 'react';
import UserHeading from './UserHeading';
import FooterCom from './FooterCom';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../config/api';

function EditProfile() {
    const navigate = useNavigate()
    const [showPass, setShowPass] = useState(false)
    const [form, setForm] = useState({
        fname: '',
        lname: '',
        mobile: '',
        usrname: '',
        pass: '',
        gender: ''
    });

    const userId = JSON.parse(localStorage.getItem('loggedInUser'))?.id; // get logged-in user ID

    useEffect(() => {
        if (userId) {
            fetch(`${API_BASE_URL}/jobseeker/${userId}`)
                .then(res => res.json())
                .then(data => setForm({
                    fname: data.fname || '',
                    lname: data.lname || '',
                    mobile: data.mobile || '',
                    usrname: data.usrname || '',
                    pass: data.pass || '',
                    gender: data.gender || ''
                }))
                .catch(err => console.log(err));
        }
    }, [userId]);

    const togglePassword = () => {
        setShowPass(!showPass);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`${API_BASE_URL}/jobseeker/update/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                alert('Profile updated successfully');
                navigate('/jobListing')
                localStorage.setItem('loggedInUser', JSON.stringify(data.updatedUser));
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.log(error);
            alert('Something went wrong');
        }
    };

    return (
        <>
            <UserHeading />
            <div className='d-flex justify-content-center bg-form'>
                <div className='col-md-6 bg-light mt-4 rounded mb-4 p-4'>
                    <h4 className='text-center mb-4 fw-bold text-info'>Edit Profile</h4>
                    <form onSubmit={handleSubmit}>
                        <input type='text' id='fname' value={form.fname} onChange={handleChange} placeholder='First Name' className='form-control mb-3' />
                        <input type='text' id='lname' value={form.lname} onChange={handleChange} placeholder='Last Name' className='form-control mb-3' />
                        <input type='text' id='mobile' value={form.mobile} onChange={handleChange} placeholder='Mobile' className='form-control mb-3' />
                        <input type='text' id='usrname' value={form.usrname} onChange={handleChange} placeholder='Username' className='form-control mb-3' />
                        <div className='col-md-12 mb-3 position-relative'>
                            <input type={showPass ? 'text' : 'password'} className='form-control' name='pass' value={form.pass} onChange={handleChange} />
                            <i className={`${showPass ? 'bi bi-eye' : 'bi bi-eye-slash '} position-absolute top-50 end-0 translate-middle-y me-4 text-secondary`}
                                style={{ cursor: 'pointer' }} onClick={togglePassword}></i>
                        </div>

                        <select id='gender' value={form.gender} onChange={handleChange} className='form-control mb-3'>
                            <option value=''>Select Gender</option>
                            <option value='male'>Male</option>
                            <option value='female'>Female</option>
                        </select>
                        <button type='submit' className='btn btn-info w-100'>Update Profile</button>
                    </form>
                </div>
            </div>
            <FooterCom />
        </>
    );
}

export default EditProfile;
