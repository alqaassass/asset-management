import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Assets from './pages/Assets';
import AssetDetail from './pages/AssetDetail';
import QRScanner from './pages/QRScanner';
import AssetTypes from './pages/AssetTypes';
import Employees from './pages/Employees';
import Layout from './components/Layout';
import InteractiveBackground from './components/InteractiveBackground';
import NotificationPopup from './components/NotificationPopup';
import NewsTicker from './components/NewsTicker';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {/* Interactive Background */}
      {isAuthenticated && <InteractiveBackground />}
      
      {/* Notification System */}
      {isAuthenticated && <NotificationPopup />}
      
      {/* News Ticker */}
      {isAuthenticated && <NewsTicker />}
      
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />
        } />
        
        <Route path="/asset/:id" element={<AssetDetail />} />
        
        <Route path="/" element={
          isAuthenticated ? <Layout onLogout={handleLogout} /> : <Navigate to="/login" />
        }>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="assets" element={<Assets />} />
          <Route path="scan" element={<QRScanner />} />
          <Route path="asset-types" element={<AssetTypes />} />
          <Route path="employees" element={<Employees />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
