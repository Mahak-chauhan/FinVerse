import { FaWallet, FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { formatCurrency } from '../../utils/formatters';

const BalanceCard = ({ balance = 0, income = 0, expense = 0 }) => {
  return (
    <div className="balance-card p-4 h-100">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div>
          <p className="mb-1 opacity-75 small">Total Balance</p>
          <h2 className="h3 fw-bold mb-0">{formatCurrency(balance)}</h2>
        </div>
        <div className="stat-icon" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
          <FaWallet />
        </div>
      </div>

      <div className="d-flex justify-content-between gap-3">
        <div className="d-flex align-items-center gap-2 flex-grow-1 rounded-3 p-3" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <div className="stat-icon" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
            <FaArrowUp />
          </div>
          <div>
            <p className="mb-0 small opacity-75">Income</p>
            <p className="mb-0 fw-bold">{formatCurrency(income)}</p>
          </div>
        </div>
        <div className="d-flex align-items-center gap-2 flex-grow-1 rounded-3 p-3" style={{ background: 'rgba(255,255,255,0.15)' }}>
          <div className="stat-icon" style={{ background: 'rgba(255,255,255,0.2)', color: '#fff' }}>
            <FaArrowDown />
          </div>
          <div>
            <p className="mb-0 small opacity-75">Expense</p>
            <p className="mb-0 fw-bold">{formatCurrency(expense)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
