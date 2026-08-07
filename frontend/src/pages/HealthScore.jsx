import { useEffect, useState, useCallback } from 'react';
import {
  FaHeartbeat,
  FaChartLine,
  FaWallet,
  FaShieldAlt,
  FaCheckCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';
import { useToast } from '../hooks/useToast';
import { getHealthScore } from '../services/scoreService';
import { formatCurrency } from '../utils/formatters';
import { DashboardSkeleton } from '../components/Loader/Skeleton';

const levelColors = {
  Bronze: ['#b45309', 'rgba(180,83,9,0.12)'],
  Silver: ['#64748b', 'rgba(100,116,139,0.12)'],
  Gold: ['#ca8a04', 'rgba(202,138,4,0.12)'],
  Platinum: ['#2563eb', 'rgba(37,99,235,0.12)'],
};

const HealthScorePage = () => {
  const { showError } = useToast();
  const [health, setHealth] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchHealth = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getHealthScore();
      setHealth(res.data.data);
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to load health score');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchHealth();
  }, [fetchHealth]);

  if (loading) {
    return (
      <div className="animate-fade">
        <DashboardSkeleton />
      </div>
    );
  }

  if (!health) return null;

  const [levelColor, levelBg] = levelColors[health.level] || ['#6366f1', 'rgba(99,102,241,0.12)'];
  const scorePercent = health.score;

  return (
    <div className="animate-fade">
      <div className="mb-4">
        <h2 className="page-title mb-1">Financial Health</h2>
        <p className="page-subtitle mb-0">
          Institutional-grade analysis of your personal finances.
        </p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-4">
          <div className="glass-card p-4 text-center h-100">
            <p className="text-uppercase small fw-semibold text-muted mb-3">
              The FinVerse Index
            </p>
            <div
              className="mx-auto d-flex align-items-center justify-content-center rounded-circle mb-3"
              style={{
                width: '160px',
                height: '160px',
                background: `conic-gradient(${levelColor} ${scorePercent * 3.6}deg, rgba(0,0,0,0.06) 0deg)`,
                position: 'relative',
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-circle bg-white"
                style={{ width: '120px', height: '120px' }}
              >
                <div>
                  <h2 className="fw-bold mb-0" style={{ color: levelColor }}>
                    {health.score}
                  </h2>
                  <small className="text-muted">/ 100</small>
                </div>
              </div>
            </div>
            <span
              className="badge rounded-pill px-3 py-2 fw-bold text-uppercase"
              style={{ background: levelBg, color: levelColor }}
            >
              {health.level} Tier
            </span>
          </div>
        </div>

        <div className="col-lg-8">
          <div className="row g-4 h-100">
            <div className="col-md-6">
              <div className="glass-card p-4 h-100">
                <div
                  className="stat-icon mb-2"
                  style={{ background: 'rgba(16,185,129,0.12)', color: '#10b981' }}
                >
<FaChartLine />
                </div>
                <p className="text-muted small mb-1">Savings Rate</p>
<h3 className="h4 fw-bold">{health.savingsRate}%</h3>
                <small className="text-muted">{'Target: >20%'}</small>
              </div>
            </div>
            <div className="col-md-6">
              <div className="glass-card p-4 h-100">
                <div
                  className="stat-icon mb-2"
                  style={{ background: 'rgba(239,68,68,0.12)', color: '#ef4444' }}
                >
                  <FaWallet />
                </div>
                <p className="text-muted small mb-1">Expense Ratio</p>
                <h3 className="h4 fw-bold">{health.expenseRatio}%</h3>
<small className="text-muted">{'Target: <50%'}</small>
              </div>
            </div>
            <div className="col-12">
              <div className="glass-card p-4 h-100">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-2">
                    <FaShieldAlt className="brand-text" />
                    <div>
                      <p className="fw-semibold mb-0">Emergency Fund</p>
                      <small className="text-muted">Months of runway</small>
                    </div>
                  </div>
                  <div>
                    <span className="h3 fw-bold brand-text">
                      {health.emergencyFundMonths}
                    </span>
                    <span className="text-muted">m</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-card p-4">
        <h5 className="fw-bold mb-1 d-flex align-items-center gap-2">
          <FaHeartbeat className="brand-text" /> AI Action Plan
        </h5>
        <p className="text-muted mb-4">
          Targeted strategies to elevate your financial tier
        </p>

        <div className="d-flex flex-column gap-3">
          {health.suggestions.map((suggestion, i) => {
            const isAlert =
              suggestion.toLowerCase().includes('reduce') ||
              suggestion.toLowerCase().includes('cut');
            return (
              <div
                key={i}
                className="d-flex gap-3 align-items-start p-3 rounded-3"
                style={{ background: 'rgba(99,102,241,0.05)' }}
              >
                <div className="mt-1">
                  {isAlert ? (
                    <FaExclamationTriangle className="text-warning" />
                  ) : (
                    <FaCheckCircle />
                  )}
                </div>
                <p className="mb-0 fw-medium">{suggestion}</p>
              </div>
            );
          })}
        </div>

        {health.totalBalance !== undefined && (
          <div className="mt-4 p-3 rounded-3" style={{ background: 'rgba(16,185,129,0.08)' }}>
            <p className="mb-0 small">
              <strong>Total Balance:</strong>{' '}
              {formatCurrency(health.totalBalance)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthScorePage;
