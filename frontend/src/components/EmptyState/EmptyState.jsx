import { FaInbox } from 'react-icons/fa';

const EmptyState = ({ icon: Icon = FaInbox, title = 'No data found', subtitle = 'There is nothing to display here yet.', action }) => {
  return (
    <div className="empty-state glass-card">
      <div className="empty-icon">
        <Icon />
      </div>
      <h5 className="fw-semibold text-dark">{title}</h5>
      <p className="mb-3">{subtitle}</p>
      {action && <div>{action}</div>}
    </div>
  );
};

export default EmptyState;
