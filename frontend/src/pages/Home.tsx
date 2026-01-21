import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user, logout } = useAuth();

  return (
    <div className="container" style={{ padding: '50px 20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h1>Welcome to MySaaS</h1>
        <p style={{ fontSize: '18px', color: '#666', marginTop: '10px' }}>
          Your modern SaaS application platform
        </p>
      </header>

      {user ? (
        <div style={{ textAlign: 'center' }}>
          <p style={{ marginBottom: '20px' }}>
            Welcome back, {user.name}!
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <Link to="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
            <button onClick={logout} className="btn" style={{ backgroundColor: '#6c757d', color: 'white' }}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <Link to="/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/register" className="btn" style={{ backgroundColor: '#28a745', color: 'white' }}>
              Register
            </Link>
          </div>
        </div>
      )}

      <div style={{ marginTop: '80px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Features</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
          <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3>🔐 Secure Authentication</h3>
            <p>Industry-standard JWT-based authentication</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3>💳 Payment Integration</h3>
            <p>Stripe integration for seamless payments</p>
          </div>
          <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
            <h3>📊 Dashboard</h3>
            <p>Comprehensive user dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
