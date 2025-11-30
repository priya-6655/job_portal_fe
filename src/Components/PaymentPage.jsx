import React, { useContext, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import HeaderCom from './HeaderCom';
import FooterCom from './FooterCom';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from './Context/AuthContext';
import HirePageGeading from './HirePageHeading';

//it give "promise", that stripe elecement will be communicate securely on frontend
const stripePromise = loadStripe('pk_test_51SSKPDRZycbY2qUQ94eYSTxDwDyZshXNWsGRbTw1hySxpa9P77mlrdCoUTK2Vtd25K1Eqjww1mZCfHBI8QdMP8W600g1roJVQd');

function CheckoutForm({ plan, amount }) {
    const stripe = useStripe(); //give access to stripe method
    const elements = useElements(); // give access to form card input
    const navigate = useNavigate();
    const { company, setCompany } = useContext(AuthContext)
    const [payData, setPayData] = useState({ name: "", email: company?.email || "", company: company?.companyName || '' });


    const getData = (e) => setPayData({ ...payData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Amount sent:", amount)

        // Call backend to create PaymentIntent
        const res = await fetch('http://192.168.29.106:3000/api/payment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                fullname: payData.name,
                email: payData.email,
                company: payData.company,
                plan,
                amount,
            }),
        });
        const { clientSecret } = await res.json();
        // client secret is what frontend uses to confirm payment

        // Confirm payment on frontend. confirmcardpayment connects stripe server with card entered in cardElement
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: { name: payData.name, email: payData.email },
            },
        });

        if (result.error) {
            alert(result.error.message);
            return;
        }

        if (result.paymentIntent.status === 'succeeded') {
            const paymentRes = await fetch('http://192.168.29.106:3000/api/paymentSuccess', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullname: payData.name,
                    email: payData.email,
                    company: payData.company,
                    plan,
                    amount,
                    paymentId: result.paymentIntent.id
                })
            })
            const { data } = await paymentRes.json()
            setCompany({ ...data })
            localStorage.setItem("company", JSON.stringify(data))
            alert('Payment successful!');
            navigate('/jobPostingPage')
        }
    };

    return (
        <form onSubmit={handleSubmit} className="col-md-12 p-4 rounded bg-white">
            <h5>Complete Your Payment</h5>

            <input name="name" placeholder="Full Name" className="form-control my-2"
                value={payData.name} onChange={getData} required />
            <input name="email" placeholder="Email" className="form-control my-2"
                value={payData.email || ''} onChange={getData} required disabled />
            <input name="company" placeholder="Company" className="form-control my-2"
                value={payData.company || ''} onChange={getData} required disabled />

            <CardElement className="border p-2 my-3" />

            <button type="submit" disabled={!stripe} className="btn btn-info w-100 mt-3">
                Pay ₹{amount}
            </button>
        </form>
    );
}

export default function PaymentPage() {
    const location = useLocation();
    const { plan, amount } = location.state || {};

    return (
        <>
            <HirePageGeading />
            <div className="container d-flex justify-content-center mt-5">
                <div className="col-md-6 rounded p-3" style={{ backgroundColor: "rgba(12,181,237,1)" }}>
                    <Elements stripe={stripePromise}>
                        <CheckoutForm plan={plan} amount={amount} />
                    </Elements>
                </div>
            </div>
            <FooterCom />
        </>
    );
}
