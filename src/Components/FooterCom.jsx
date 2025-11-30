import React from 'react'

function FooterCom() {
    return (
        <div>
            <footer className='d-flex flex-column text-white py-3 mt-5' style={{ backgroundColor: "rgba(231, 226, 222, 1)" }}>
                <p style={{ color: 'black', paddingLeft: '20px' }}>Find Jobs By Types</p>
                <div className='d-flex flex-row justify-content-between' style={{ color: 'blue' }}>
                    <div className='d-flex flex-column' style={{ paddingLeft: '20px' }}>
                        <p>Accountant</p>
                        <p>Beautician</p>
                        <p>Content Writing</p>
                        <p>Digital Marketing</p>
                        <p>Finance</p>
                        <p>Medical (Doctor, Dentist etc.)</p>
                        <p>Hotel / Waiter</p>
                        <p>Lab Technician</p>
                        <p>Teacher</p>
                    </div>

                    <div className='d-flex flex-column'>
                        <p>Data Entry</p>
                        <p>Driver</p>
                        <p>Hardware Engineer</p>
                        <p>Nursing</p>
                        <p>Receptionist</p>
                        <p>Security Guard</p>
                        <p>Technician</p>
                        <p>Housekeeping</p>
                        <p>Cook</p>
                    </div>

                    <div className='d-flex flex-column'>
                        <p>Back Office</p>
                        <p>Computer Operator</p>
                        <p>Delivery</p>
                        <p>Graphic Designer</p>
                        <p>HR Executive</p>
                        <p>Marketing</p>
                        <p>Software Developer</p>
                        <p>Telecalling/BPO</p>
                        <p>Hotel Management</p>
                    </div>

                    <div className='d-flex flex-column flex-md-row align-items-center justify-content-center gap-3'>
                        <img src='https://png.pngtree.com/png-clipart/20220720/ourmid/pngtree-decorative-line-divider-black-vintage-line-lace-png-image_6022315.png' style={{ width: '120px', height: 'auto' }} />
                        <img src='https://img.pikbest.com/png-images/20241023/vintage-bird-logo-for-eco-friendly-products_10996346.png!sw800'
                            alt='Job Hiring Logo' className='jobLogo' style={{ width: '120px', height: 'auto' }} />

                        <img src='https://png.pngtree.com/png-vector/20220905/ourmid/pngtree-iso-14001-certified-company-logo-badge-png-image_6137639.png'
                            alt='ISO Certified Logo' className='isoLogo' style={{ width: '100px', height: 'auto' }} />
                        <img src='https://png.pngtree.com/png-clipart/20220720/ourmid/pngtree-decorative-line-divider-black-vintage-line-lace-png-image_6022315.png' style={{ width: '120px', height: 'auto' }} />
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default FooterCom
