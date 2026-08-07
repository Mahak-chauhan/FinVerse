import { useState } from 'react';
import {
  FaBuilding,
  FaCalculator,
  FaArrowRight,
  FaPercentage,
} from 'react-icons/fa';
import Form from 'react-bootstrap/Form';
import { useToast } from '../hooks/useToast';
import { checkEligibility } from '../services/loanService';
import { formatCurrency } from '../utils/formatters';
import EmptyState from '../components/EmptyState/EmptyState';

const EMPLOYMENT_TYPES = [
  'Salaried',
  'Self-Employed',
  'Business Owner',
  'Freelancer',
  'Student',
  'Unemployed',
];

const LoanMarketplace = () => {
  const { showError, showSuccess } = useToast();
  const [form, setForm] = useState({
    monthlyIncome: '',
    employmentType: 'Salaried',
    monthlyExpenses: '',
    existingLoanEmi: '0',
    loanAmount: '',
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await checkEligibility({
        monthlyIncome: Number(form.monthlyIncome),
        employmentType: form.employmentType,
        monthlyExpenses: Number(form.monthlyExpenses),
        existingLoanEmi: Number(form.existingLoanEmi) || 0,
        loanAmount: form.loanAmount ? Number(form.loanAmount) : undefined,
      });
      setResult(res.data.data);
      showSuccess('Eligibility calculated successfully');
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to check eligibility');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="animate-fade">
      <div className="mb-4">
        <h2 className="page-title mb-1">Loan Marketplace</h2>
        <p className="page-subtitle mb-0">
          Discover premium financing options based on your exact profile.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-4">
          <div className="glass-card p-4">
            <h5 className="fw-bold mb-1">Check Eligibility</h5>
            <p className="text-muted small mb-4">
              Enter details to calculate offers instantly
            </p>

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Monthly Income</Form.Label>
                <Form.Control
                  type="number"
                  name="monthlyIncome"
                  placeholder="Enter monthly income"
                  value={form.monthlyIncome}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Employment</Form.Label>
                <Form.Select
                  name="employmentType"
                  value={form.employmentType}
                  onChange={handleChange}
                >
                  {EMPLOYMENT_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">Monthly Expenses</Form.Label>
                <Form.Control
                  type="number"
                  name="monthlyExpenses"
                  placeholder="Enter monthly expenses"
                  value={form.monthlyExpenses}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="fw-semibold">
                  Existing EMI (Optional)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="existingLoanEmi"
                  placeholder="0"
                  value={form.existingLoanEmi}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label className="fw-semibold">
                  Desired Loan (Optional)
                </Form.Label>
                <Form.Control
                  type="number"
                  name="loanAmount"
                  placeholder="Enter loan amount"
                  value={form.loanAmount}
                  onChange={handleChange}
                />
              </Form.Group>

              <button
                type="submit"
                className="btn-gradient btn w-100"
                disabled={loading}
              >
                {loading ? 'Calculating...' : 'Find Offers'}
              </button>
            </Form>
          </div>
        </div>

        <div className="col-lg-8">
          {result ? (
            <div className="animate-fade">
              <div className="balance-card p-4 mb-4">
                <div className="row text-center g-4">
                  <div className="col-md-4">
                    <p className="mb-1 opacity-75 small text-uppercase">
                      Approval Odds
                    </p>
                    <h3 className="fw-bold mb-0">
                      {result.approvalPercentage}%
                    </h3>
                  </div>
                  <div className="col-md-4">
                    <p className="mb-1 opacity-75 small text-uppercase">
                      Suggested Limit
                    </p>
                    <h3 className="fw-bold mb-0">
                      {formatCurrency(result.suggestedLoanAmount)}
                    </h3>
                  </div>
                  <div className="col-md-4">
                    <p className="mb-1 opacity-75 small text-uppercase">
                      Est. Best Rate
                    </p>
                    <h3 className="fw-bold mb-0">{result.interestRate}%</h3>
                  </div>
                </div>
              </div>

              <h5 className="fw-bold mb-3">Curated Offers</h5>
              <div className="d-flex flex-column gap-3">
                {result.offers.map((offer, i) => (
                  <div className="glass-card p-4" key={i}>
                    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-4">
                      <div className="d-flex align-items-center gap-3">
                        <div
                          className="stat-icon"
                          style={{
                            background: 'rgba(99,102,241,0.1)',
                            color: '#6366f1',
                          }}
                        >
                          <FaBuilding />
                        </div>
                        <div>
                          <h6 className="fw-bold mb-0">{offer.lenderName}</h6>
                          <small className="text-muted">
                            Term: {offer.tenureMonths} Months
                          </small>
                        </div>
                      </div>

                      <div className="d-flex gap-4 flex-wrap">
                        <div>
                          <small className="text-muted text-uppercase d-block">
                            Max Amount
                          </small>
                          <span className="fw-bold">
                            {formatCurrency(offer.amount)}
                          </span>
                        </div>
                        <div>
                          <small className="text-muted text-uppercase d-block">
                            APR
                          </small>
                          <span className="fw-bold">
                            {offer.interestRate}% <FaPercentage className="text-muted" />
                          </span>
                        </div>
                        <div>
                          <small className="text-muted text-uppercase d-block">
                            Est. EMI
                          </small>
                          <span className="fw-bold brand-text">
                            {formatCurrency(offer.emi)}/mo
                          </span>
                        </div>
                      </div>

                      <button className="btn-gradient btn d-flex align-items-center gap-2">
                        Apply <FaArrowRight />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState
              icon={FaCalculator}
              title="Awaiting Input"
              subtitle="Enter your financial details to instantly unlock tailored lending offers from premium institutions."
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanMarketplace;
