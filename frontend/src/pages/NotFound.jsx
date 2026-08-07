import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="auth-container">
      <div className="text-center">
        <h1 className="display-1 fw-bold brand-text">404</h1>
        <h3 className="fw-semibold text-dark mb-3">Page Not Found</h3>
        <p className="text-muted mb-4">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link to="/" className="btn-gradient btn d-inline-flex align-items-center gap-2">
          <FaHome />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
