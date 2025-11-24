import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar container">
            <Link to="/" className="logo">IRCTC Sim</Link>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/pnr-status" className="nav-link">PNR Status</Link>
                <Link to="/meals" className="nav-link">Meals</Link>
                <Link to="/holidays" className="nav-link">Holidays</Link>
                <Link to="/contact" className="nav-link">Contact</Link>

                {user ? (
                    <>
                        <Link to="/dashboard" className="nav-link">My Bookings</Link>

                        {user.role === 'admin' && (
                            <Link to="/admin" className="btn-nav btn-admin">Admin Panel</Link>
                        )}

                        <Link to="/profile" className="btn-nav btn-profile">Profile</Link>

                        <button onClick={handleLogout} className="btn btn-secondary logout-btn">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="nav-link">Login</Link>
                        <Link to="/signup" className="btn btn-primary">Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
