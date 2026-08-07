const StatCard = ({ icon: Icon, label, value, color = '#6366f1', bg = 'rgba(99,102,241,0.1)' }) => {
  return (
    <div className="glass-card p-4 h-100">
      <div className="d-flex align-items-center justify-content-between mb-3">
        <div className="stat-icon" style={{ background: bg, color }}>
          <Icon />
        </div>
      </div>
      <h3 className="h4 fw-bold mb-1">{value}</h3>
      <p className="text-muted mb-0 small">{label}</p>
    </div>
  );
};

export default StatCard;
