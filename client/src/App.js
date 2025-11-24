import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

// Lazy load components
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Signup = lazy(() => import('./pages/Signup'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const Booking = lazy(() => import('./pages/Booking'));
const Admin = lazy(() => import('./pages/Admin'));
const Profile = lazy(() => import('./pages/Profile'));
const Placeholder = lazy(() => import('./pages/Placeholder'));

const LoadingFallback = () => (
  <div className="container" style={{ textAlign: 'center', padding: '50px' }}>
    <div style={{ fontSize: '1.5rem', color: 'var(--primary)' }}>Loading...</div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/booking/:trainId/:classType" element={<Booking />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/pnr-status" element={<Placeholder />} />
            <Route path="/meals" element={<Placeholder />} />
            <Route path="/holidays" element={<Placeholder />} />
            <Route path="/contact" element={<Placeholder />} />
          </Routes>
        </Suspense>
      </Router>
    </AuthProvider>
  );
}

export default App;
