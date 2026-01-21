import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="container" style={{ padding: '50px 20px' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="btn" style={{ backgroundColor: '#6c757d', color: 'white' }}>
          Logout
        </button>
      </header>

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', marginBottom: '20px' }}>
        <h2>Welcome, {user?.name}!</h2>
        <p style={{ color: '#666', marginTop: '10px' }}>Email: {user?.email}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>📊 Statistics</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>View your usage statistics and analytics</p>
          <button className="btn btn-primary" style={{ marginTop: '20px' }}>View Stats</button>
        </div>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>💳 Subscription</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>Manage your subscription plan</p>
          <button className="btn btn-primary" style={{ marginTop: '20px' }}>Manage Subscription</button>
        </div>

        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <h3>⚙️ Settings</h3>
          <p style={{ color: '#666', marginTop: '10px' }}>Update your account settings</p>
          <button className="btn btn-primary" style={{ marginTop: '20px' }}>Go to Settings</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
