import { NavLink } from 'react-router-dom';
import {
  FaHome,
  FaExchangeAlt,
  FaChartLine,
  FaUserCog,
  FaPiggyBank,
  FaHeartbeat,
  FaCreditCard,
  FaLandmark,
  FaGraduationCap,
  FaRobot,
} from 'react-icons/fa';

const Sidebar = () => {
  const links = [
    { to: '/', label: 'Dashboard', icon: FaHome, end: true },
    { to: '/transactions', label: 'Transactions', icon: FaExchangeAlt, end: false },
    { to: '/analytics', label: 'Analytics', icon: FaChartLine, end: false },
    { to: '/savings', label: 'Savings Vault', icon: FaPiggyBank, end: false },
    { to: '/health-score', label: 'Health Score', icon: FaHeartbeat, end: false },
    { to: '/credit-check', label: 'Credit Check', icon: FaCreditCard, end: false },
    { to: '/loans', label: 'Loan Market', icon: FaLandmark, end: false },
    { to: '/academy', label: 'Academy', icon: FaGraduationCap, end: false },
    { to: '/ai-mentor', label: 'AI Mentor', icon: FaRobot, end: false },
    { to: '/profile', label: 'Profile', icon: FaUserCog, end: false },
  ];

  return (
    <aside className="sidebar">
      <nav className="d-flex flex-column">
        {links.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}
          >
            <Icon />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
