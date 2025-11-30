import React from 'react'

function HeaderCom({ onSelectType }) {
    const viewPayPage = (e) => {
        onSelectType(e.target.value)

    }
    return (
        <div>
            <div className='container-fluid header d-flex flex-row align-items-center p-2 shadow-sm'>
                <img src='https://img.pikbest.com/png-images/20241023/vintage-bird-logo-for-eco-friendly-products_10996346.png!sw800' className='jobLogo me-2' />
                <h4 className='m-0 fw-bold text-center flex-grow-1'>Fast Grow Job Portal</h4>
                <select className='form-select mx-end mt-2 personType' onChange={viewPayPage}>
                    <option value=''>Select Your Type</option>
                    <option value='Job Seeker' className='option'>Job Seeker</option>
                    <option value='Employee Hiring' className='option'>Employee Hiring</option>
                </select>
            </div>

            <div className='container-fluid scroll-text'>
                🚀 Fast Grow Job Portal — Find Your Dream Job Today! 💼 Explore Thousands of
                Opportunities, Apply Instantly, and Start Your Career Journey with Us!
            </div>
        </div>
    )
}

export default HeaderCom
