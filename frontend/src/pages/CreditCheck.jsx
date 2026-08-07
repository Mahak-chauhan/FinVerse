import { useEffect, useState, useCallback } from 'react';
import {
  FaFingerprint,
  FaShieldAlt,
  FaCheckCircle,
  FaCreditCard,
} from 'react-icons/fa';
import { useToast } from '../hooks/useToast';
import { getCreditScore } from '../services/scoreService';
import { DashboardSkeleton } from '../components/Loader/Skeleton';

const CreditCheck = () => {
  const { showError } = useToast();
  const [credit, setCredit] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCredit = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCreditScore();
      setCredit(res.data.data);
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to load credit score');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchCredit();
  }, [fetchCredit]);

  if (loading) {
    return (
      <div className="animate-fade">
        <DashboardSkeleton />
      </div>
    );
  }

  if (!credit) return null;

  const percent = Math.max(0, Math.min(100, ((credit.score - 300) / 600) * 100));

  let color = '#ef4444';
  if (credit.score >= 600) color = '#10b981';
  if (credit.score >= 700) color = '#6366f1';
  if (credit.score >= 800) color = '#7c3aed';

  return (
    <div className="animate-fade">
      <div className="mb-4">
        <h2 className="page-title mb-1">Credit Analysis</h2>
        <p className="page-subtitle mb-0">
          Continuous monitoring of your borrowing power.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="glass-card p-4 text-center h-100">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <FaFingerprint className="text-muted opacity-50" />
              <small className="text-uppercase fw-bold text-muted">
                Equifax / Experian Base
              </small>
            </div>

            <div
              className="mx-auto d-flex align-items-center justify-content-center rounded-circle position-relative mb-3"
              style={{
                width: '200px',
                height: '200px',
                background: `conic-gradient(${color} ${percent * 3.6}deg, rgba(0,0,0,0.06) 0deg)`,
              }}
            >
              <div
                className="d-flex align-items-center justify-content-center rounded-circle bg-white"
                style={{ width: '150px', height: '150px' }}
              >
                <div>
                  <h2 className="fw-bold mb-0" style={{ color }}>
                    {credit.score}
                  </h2>
                  <small className="text-muted text-uppercase">
                    {credit.riskLevel.replace(/_/g, ' ')}
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-6">
          <div className="d-flex flex-column gap-4 h-100">
            <div className="balance-card p-4">
              <div className="d-flex gap-3 align-items-start">
                <FaShieldAlt className="fs-3 opacity-75 mt-1" />
                <div>
                  <h5 className="fw-bold mb-1">Loan Approval Probability</h5>
                  <h3 className="fw-bold mb-2 text-uppercase">
                    {credit.loanApprovalChance.replace(/_/g, ' ')}
                  </h3>
                  <p className="mb-0 opacity-75 small">
                    Based on current market conditions and your profile, lenders
                    will view your application favorably.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-card p-4">
              <h6 className="fw-bold mb-3 d-flex align-items-center gap-2">
                <FaCreditCard className="text-muted" /> Data Security
              </h6>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex gap-2 align-items-center small">
                  <FaCheckCircle className="text-success" />
                  <span className="fw-medium">
                    No recent hard inquiries detected
                  </span>
                </div>
                <div className="d-flex gap-2 align-items-center small">
                  <FaCheckCircle className="text-success" />
                  <span className="fw-medium">
                    Identity monitoring active
                  </span>
                </div>
                <div className="d-flex gap-2 align-items-center small">
                  <FaCheckCircle className="text-success" />
                  <span className="fw-medium">
                    Credit utilization optimal ({credit.utilizationRate}%)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreditCheck;
