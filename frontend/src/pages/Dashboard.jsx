import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  FaArrowUp,
  FaArrowDown,
  FaMoneyBillWave,
  FaPlus,
  FaReceipt,
  FaHeartbeat,
  FaCreditCard,
  FaPiggyBank,
} from 'react-icons/fa';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '../hooks/useToast';
import {
  getSummary,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../services/transactionService';
import { formatCurrency, formatDate, getGreeting } from '../utils/formatters';
import { getCategory } from '../utils/constants';

import BalanceCard from '../components/Cards/BalanceCard';
import StatCard from '../components/Cards/StatCard';
import ScoreCard from '../components/Cards/ScoreCard';
import InsightCard from '../components/Cards/InsightCard';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import LineChart from '../components/Charts/LineChart';
import TransactionModal from '../components/Forms/TransactionModal';
import { DashboardSkeleton } from '../components/Loader/Skeleton';
import EmptyState from '../components/EmptyState/EmptyState';

const Dashboard = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useToast();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getSummary();
      setSummary(res.data.data);
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to load dashboard');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  const pieData = summary
    ? Object.entries(summary.categoryExpenses).map(([name, value]) => ({
        name,
        value,
        color: getCategory(name).color,
      }))
    : [];

  const barData = summary?.monthlyData || [];

  const lineData = summary
    ? summary.monthlyData.map((d) => ({
        month: d.month,
        balance: d.income - d.expense,
      }))
    : [];

  const handleSubmit = async (data) => {
    try {
      if (editing) {
        await updateTransaction(editing._id, data);
        showSuccess('Transaction updated successfully');
      } else {
        await createTransaction(data);
        showSuccess('Transaction added successfully');
      }
      setShowModal(false);
      setEditing(null);
      fetchSummary();
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to save transaction');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    try {
      await deleteTransaction(id);
      showSuccess('Transaction deleted');
      fetchSummary();
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to delete transaction');
    }
  };

  if (loading) {
    return (
      <div className="animate-fade">
        <DashboardSkeleton />
      </div>
    );
  }

  return (
    <div className="animate-fade">
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
        <div>
          <h2 className="page-title mb-1">
            {getGreeting()}, {user?.name?.split(' ')[0]} 👋
          </h2>
          <p className="page-subtitle mb-0">
            Here's your financial overview for this month.
          </p>
        </div>
        <button className="btn-gradient btn d-flex align-items-center gap-2 mt-2 mt-md-0" onClick={() => { setEditing(null); setShowModal(true); }}>
          <FaPlus />
          Add Transaction
        </button>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6 col-xl-6">
          <BalanceCard
            balance={summary?.totals?.totalBalance}
            income={summary?.totals?.totalIncome}
            expense={summary?.totals?.totalExpense}
          />
        </div>
        <div className="col-md-6 col-xl-3">
          <StatCard
            icon={FaArrowUp}
            label="Total Income"
            value={formatCurrency(summary?.totals?.totalIncome)}
            color="#10b981"
            bg="rgba(16,185,129,0.1)"
          />
        </div>
        <div className="col-md-6 col-xl-3">
          <StatCard
            icon={FaArrowDown}
            label="Total Expense"
            value={formatCurrency(summary?.totals?.totalExpense)}
            color="#ef4444"
            bg="rgba(239,68,68,0.1)"
          />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <StatCard
            icon={FaMoneyBillWave}
            label="This Month Income"
            value={formatCurrency(summary?.monthly?.income)}
            color="#06b6d4"
            bg="rgba(6,182,212,0.1)"
          />
        </div>
        <div className="col-md-6">
          <StatCard
            icon={FaReceipt}
            label="This Month Expense"
            value={formatCurrency(summary?.monthly?.expense)}
            color="#f59e0b"
            bg="rgba(245,158,11,0.1)"
          />
        </div>
      </div>

<div className="row g-4 mb-4">
        <div className="col-md-6 col-xl-3">
          <ScoreCard
            title="Health Score"
            icon={FaHeartbeat}
            color="#10b981"
            link
            to="/health-score"
          />
        </div>
        <div className="col-md-6 col-xl-3">
          <ScoreCard
            title="Credit Check"
            icon={FaCreditCard}
            color="#6366f1"
            link
            to="/credit-check"
          />
        </div>
        <div className="col-md-6 col-xl-3">
          <ScoreCard
            title="Savings Vault"
            icon={FaPiggyBank}
            color="#f59e0b"
            link
            to="/savings"
          />
        </div>
        <div className="col-md-6 col-xl-3">
          <ScoreCard
            title="Loan Market"
            icon={FaCreditCard}
            color="#8b5cf6"
            link
            to="/loans"
          />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-3">Category Wise Expenses</h5>
            {pieData.length ? (
              <PieChart data={pieData} />
            ) : (
              <EmptyState title="No expense data" subtitle="Add expenses to see the breakdown." />
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-3">Monthly Income vs Expense</h5>
            {barData.length ? (
              <BarChart data={barData} />
            ) : (
              <EmptyState title="No monthly data" subtitle="Your spending trends will appear here." />
            )}
          </div>
        </div>
      </div>

<div className="row g-4 mb-4">
        <div className="col-12">
          <h5 className="fw-bold mb-3 d-flex align-items-center gap-2">
            <FaHeartbeat className="brand-text" /> AI Insights
          </h5>
          <div className="row g-3">
            <div className="col-md-6 col-xl-3">
              <InsightCard
                title="Spending Pattern"
                text="Your top spending category is likely on track. Review recurring subscriptions to free up monthly cash."
              />
            </div>
            <div className="col-md-6 col-xl-3">
              <InsightCard
                title="Savings Opportunity"
                text="Consider automating a fixed transfer to your savings vault right after salary to build wealth consistently."
              />
            </div>
            <div className="col-md-6 col-xl-3">
              <InsightCard
                title="Credit Health"
                text="Keeping your credit utilization low and paying bills on time steadily improves your credit score."
              />
            </div>
            <div className="col-md-6 col-xl-3">
              <InsightCard
                title="Diversify"
                text="Explore SIPs and mutual funds to put idle balances to work and beat inflation over the long term."
              />
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-5">
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-3">Balance Trend</h5>
            {lineData.some((d) => d.balance !== 0) ? (
              <LineChart data={lineData} height={280} />
            ) : (
              <EmptyState title="No balance trend" subtitle="Your balance history will show here." />
            )}
          </div>
        </div>
        <div className="col-lg-7">
          <div className="glass-card p-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <h5 className="fw-bold mb-0">Recent Transactions</h5>
              <Link to="/transactions" className="text-decoration-none small brand-text fw-semibold">
                View All →
              </Link>
            </div>

            {summary?.recentTransactions?.length ? (
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <tbody>
                    {summary.recentTransactions.map((t) => {
                      const cat = getCategory(t.category);
                      const Icon = cat.icon;
                      return (
                        <tr key={t._id}>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <div className="stat-icon" style={{ background: `${cat.color}20`, color: cat.color }}>
                                <Icon />
                              </div>
                              <div>
                                <p className="mb-0 fw-semibold">{t.title}</p>
                                <small className="text-muted">{formatDate(t.date)}</small>
                              </div>
                            </div>
                          </td>
                          <td>
                            <span className={`badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}`}>
                              {t.type}
                            </span>
                          </td>
                          <td className={`text-end fw-bold ${t.type === 'income' ? 'text-success' : 'text-danger'}`}>
                            {t.type === 'income' ? '+' : '-'}
                            {formatCurrency(t.amount)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <EmptyState
                title="No transactions yet"
                subtitle="Add your first transaction to get started."
                action={
                  <button className="btn-gradient btn" onClick={() => { setEditing(null); setShowModal(true); }}>
                    <FaPlus className="me-1" /> Add Transaction
                  </button>
                }
              />
            )}
          </div>
        </div>
      </div>

      <TransactionModal
        show={showModal}
        onClose={() => { setShowModal(false); setEditing(null); }}
        editing={editing}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Dashboard;
