import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import './SearchResults.css';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const source = searchParams.get('source');
    const destination = searchParams.get('destination');
    const [trains, setTrains] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/api/trains?source=${source}&destination=${destination}`)
            .then(res => res.json())
            .then(data => setTrains(data));
    }, [source, destination]);

    return (
        <div className="container">
            <div className="search-results-header">
                <h2 className="page-title">Search Results</h2>
                <p className="search-subtitle">Showing trains from {source} to {destination}</p>
            </div>

            {trains.length === 0 ? (
                <div className="card" style={{ textAlign: 'center', padding: '40px' }}>
                    <h3>No trains found</h3>
                    <p style={{ color: 'var(--text-muted)' }}>Try different stations or dates.</p>
                </div>
            ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {trains.map(train => (
                        <div key={train.id} className="card train-card">
                            <div className="train-info">
                                <h3>{train.name}</h3>
                                <div className="train-schedule">
                                    <div>
                                        <div style={{ fontSize: '0.9rem' }}>Departure</div>
                                        <div className="schedule-time">{train.departureTime}</div>
                                        <div>{train.source}</div>
                                    </div>
                                    <div className="schedule-arrow">➜</div>
                                    <div>
                                        <div style={{ fontSize: '0.9rem' }}>Arrival</div>
                                        <div className="schedule-time">{train.arrivalTime}</div>
                                        <div>{train.destination}</div>
                                    </div>
                                </div>
                                <div className="train-days">
                                    Runs on: {train.days.join(', ')}
                                </div>
                            </div>

                            <div className="classes-container">
                                {train.classes.map(cls => (
                                    <div key={cls.type} className="class-card">
                                        <div className="class-type">{cls.type}</div>
                                        <div className="class-price">₹{cls.price}</div>
                                        <div className={`class-availability ${cls.seats > 0 ? 'avail-green' : 'avail-red'}`}>
                                            {cls.seats > 0 ? `AVL ${cls.seats}` : 'WL'}
                                        </div>
                                        {cls.seats > 0 && (
                                            <button
                                                className="btn btn-primary book-btn-small"
                                                onClick={() => navigate(`/booking/${train.id}/${cls.type}?price=${cls.price}`)}
                                            >
                                                Book
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchResults;
