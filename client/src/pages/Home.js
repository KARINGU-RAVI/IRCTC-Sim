import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search?source=${source}&destination=${destination}`);
    };

    return (
        <div className="container home-container">
            <h1 className="hero-title">
                Book Your Train Tickets
            </h1>
            <p className="hero-subtitle">
                Fast, simple, and secure train ticket booking simulation.
            </p>

            <div className="card search-card">
                <form onSubmit={handleSearch} className="search-form">
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            placeholder="From (e.g. New Delhi)"
                            className="input-field"
                            value={source}
                            onChange={(e) => setSource(e.target.value)}
                            required
                        />
                    </div>
                    <div className="search-input-wrapper">
                        <input
                            type="text"
                            placeholder="To (e.g. Mumbai)"
                            className="input-field"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                            required
                        />
                    </div>
                    <div className="search-input-wrapper">
                        <input
                            type="date"
                            className="input-field"
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Search Trains</button>
                </form>
            </div>

            <div className="grid features-grid">
                <div className="card feature-card">
                    <h3>⚡ Instant Booking</h3>
                    <p>Book your tickets in seconds with our streamlined process.</p>
                </div>
                <div className="card feature-card">
                    <h3>🛡️ Secure Payments</h3>
                    <p>Your data is protected with state-of-the-art encryption.</p>
                </div>
                <div className="card feature-card">
                    <h3>🚆 Live Status</h3>
                    <p>Real-time updates on train schedules and availability.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
