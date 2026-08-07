import { FaLightbulb } from 'react-icons/fa';

const InsightCard = ({ title = 'AI Insight', text }) => {
  return (
    <div className="glass-card p-4 border-0">
      <div className="d-flex gap-3 align-items-start">
        <div
          className="stat-icon"
          style={{
            background: 'rgba(99,102,241,0.12)',
            color: '#6366f1',
            width: '42px',
            height: '42px',
            fontSize: '18px',
          }}
        >
          <FaLightbulb />
        </div>
        <div>
          <h6 className="fw-bold mb-1 brand-text">{title}</h6>
          <p className="text-muted mb-0" style={{ fontSize: '0.9rem' }}>
            {text}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InsightCard;
