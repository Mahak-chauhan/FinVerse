import { Link } from 'react-router-dom';

const ScoreCard = ({ title, value, suffix, link, to, color = '#6366f1', icon: Icon }) => {
  const content = (
    <div className="glass-card p-4 h-100 text-center">
      <div className="mb-2">
        <Icon style={{ color, fontSize: '26px' }} />
      </div>
      <h3 className="h4 fw-bold mb-1">
        {value}
        {suffix && <span className="fs-6 text-muted">{suffix}</span>}
      </h3>
      <p className="text-muted mb-1 small">{title}</p>
      {link && (
        <span className="small brand-text fw-semibold text-decoration-none">
          View Details →
        </span>
      )}
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="text-decoration-none">
        {content}
      </Link>
    );
  }

  return content;
};

export default ScoreCard;
