import React from 'react';
import { useLocation } from 'react-router-dom';

const Placeholder = () => {
    const location = useLocation();
    const title = location.pathname.substring(1).replace('-', ' ').toUpperCase();

    return (
        <div className="container" style={{ textAlign: 'center', padding: '60px 0' }}>
            <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <h2 className="page-title">{title}</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem' }}>
                    This feature is currently under development.
                </p>
                <div style={{ fontSize: '4rem', marginTop: '20px' }}>🚧</div>
            </div>
        </div>
    );
};

export default Placeholder;
