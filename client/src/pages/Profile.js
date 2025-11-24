import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Profile.css';

const Profile = () => {
    const { user } = useAuth();

    if (!user) return <div className="container">Please login to view profile.</div>;

    return (
        <div className="container">
            <div className="card profile-container">
                <div className="profile-header">
                    <div className="profile-avatar">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="profile-info">
                        <h2>{user.name}</h2>
                        <div className="profile-email">{user.email}</div>
                        <div style={{ marginTop: '5px' }}>
                            <span className="status-badge status-booked" style={{ background: '#e0e7ff', color: '#3730a3' }}>
                                {user.role.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="profile-section">
                    <h3>Personal Details</h3>
                    <div className="input-group">
                        <label className="auth-label">Full Name</label>
                        <input type="text" value={user.name} disabled className="input-field" style={{ background: '#f1f5f9' }} />
                    </div>
                    <div className="input-group">
                        <label className="auth-label">Email Address</label>
                        <input type="email" value={user.email} disabled className="input-field" style={{ background: '#f1f5f9' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
