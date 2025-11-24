import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Booking.css';

const Booking = () => {
    const { trainId, classType } = useParams();
    const [searchParams] = useSearchParams();
    const price = parseInt(searchParams.get('price'));
    const { user } = useAuth();
    const navigate = useNavigate();

    const [passenger, setPassenger] = useState({ name: '', age: '', gender: '', berth: '' });
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [loading, setLoading] = useState(false);

    const handleBook = async () => {
        if (!user) {
            alert('Please login to book');
            navigate('/login');
            return;
        }
        setLoading(true);

        // Simulate payment delay
        setTimeout(async () => {
            const res = await fetch('http://localhost:5000/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: user.id,
                    trainId,
                    date: new Date().toISOString().split('T')[0], // Mock date
                    passengerDetails: [passenger],
                    totalAmount: price
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success) {
                alert('Booking Successful!');
                navigate('/dashboard');
            } else {
                alert('Booking Failed: ' + data.message);
            }
        }, 2000);
    };

    return (
        <div className="container">
            <h2 className="page-title">Complete Booking</h2>
            <div className="grid">
                <div className="card">
                    <h3>Passenger Details</h3>
                    <div className="input-group">
                        <label className="auth-label">Name</label>
                        <input
                            type="text"
                            className="input-field"
                            value={passenger.name}
                            onChange={(e) => setPassenger({ ...passenger, name: e.target.value })}
                        />
                    </div>
                    <div className="passenger-form-row">
                        <div className="input-group passenger-form-col">
                            <label className="auth-label">Age</label>
                            <input
                                type="number"
                                className="input-field"
                                value={passenger.age}
                                onChange={(e) => setPassenger({ ...passenger, age: e.target.value })}
                            />
                        </div>
                        <div className="input-group passenger-form-col">
                            <label className="auth-label">Gender</label>
                            <select
                                className="input-field"
                                value={passenger.gender}
                                onChange={(e) => setPassenger({ ...passenger, gender: e.target.value })}
                            >
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className="input-group">
                        <label className="auth-label">Berth Preference</label>
                        <select
                            className="input-field"
                            value={passenger.berth}
                            onChange={(e) => setPassenger({ ...passenger, berth: e.target.value })}
                        >
                            <option value="">No Preference</option>
                            <option value="Lower">Lower</option>
                            <option value="Middle">Middle</option>
                            <option value="Upper">Upper</option>
                            <option value="Side Lower">Side Lower</option>
                        </select>
                    </div>
                </div>

                <div className="card">
                    <h3>Payment Summary</h3>
                    <div className="payment-summary-row">
                        <span>Ticket Price ({classType})</span>
                        <span>₹{price}</span>
                    </div>
                    <div className="payment-total-row">
                        <span>Total</span>
                        <span>₹{price}</span>
                    </div>

                    <h4 className="payment-method-title">Payment Method</h4>
                    <div className="input-group">
                        <select
                            className="input-field"
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="card">Credit/Debit Card</option>
                            <option value="upi">UPI</option>
                            <option value="netbanking">Net Banking</option>
                        </select>
                    </div>

                    <button
                        className="btn btn-primary pay-btn"
                        onClick={handleBook}
                        disabled={loading}
                    >
                        {loading ? 'Processing...' : `Pay ₹${price}`}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Booking;
