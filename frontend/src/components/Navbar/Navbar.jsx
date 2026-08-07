import { Link, useNavigate } from 'react-router-dom';
import { FaWallet, FaSignOutAlt, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../hooks/useAuth';
import { getInitials } from '../../utils/formatters';

const Navbar = ({ onToggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="app-navbar">
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn d-lg-none"
            onClick={onToggleSidebar}
            aria-label="Toggle sidebar"
          >
            <i className="bi bi-list fs-3"></i>
          </button>

          <Link to="/" className="d-flex align-items-center gap-2">
            <div
              className="stat-icon"
              style={{ background: 'linear-gradient(135deg,#6366f1,#8b5cf6)', color: '#fff' }}
            >
              <FaWallet />
            </div>
<span className="brand-text fs-5">FinVerse</span>
          </Link>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="d-none d-md-flex align-items-center gap-2">
            <div
              className="d-flex align-items-center justify-content-center rounded-circle"
              style={{
                width: '38px',
                height: '38px',
                background: 'linear-gradient(135deg,#6366f1,#8b5cf6)',
                color: '#fff',
                fontWeight: '600',
                fontSize: '0.9rem',
              }}
            >
              {getInitials(user?.name)}
            </div>
            <div>
              <p className="mb-0 fw-semibold small">{user?.name}</p>
              <p className="mb-0 text-muted" style={{ fontSize: '0.75rem' }}>
                {user?.email}
              </p>
            </div>
          </div>

          <Link to="/profile" className="btn btn-outline-gradient btn-sm d-flex align-items-center gap-2">
            <FaUserCircle />
            <span className="d-none d-sm-inline">Profile</span>
          </Link>
          <button className="btn btn-outline-gradient btn-sm d-flex align-items-center gap-2" onClick={handleLogout}>
            <FaSignOutAlt />
            <span className="d-none d-sm-inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
