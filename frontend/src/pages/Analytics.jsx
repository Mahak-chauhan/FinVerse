import { useState, useEffect, useCallback } from 'react';
import {
  FaArrowUp,
  FaArrowDown,
  FaWallet,
  FaReceipt,
  FaChartPie,
} from 'react-icons/fa';
import { useToast } from '../hooks/useToast';
import { getSummary } from '../services/transactionService';
import { formatCurrency } from '../utils/formatters';
import { getCategory } from '../utils/constants';

import StatCard from '../components/Cards/StatCard';
import PieChart from '../components/Charts/PieChart';
import BarChart from '../components/Charts/BarChart';
import LineChart from '../components/Charts/LineChart';
import { DashboardSkeleton } from '../components/Loader/Skeleton';
import EmptyState from '../components/EmptyState/EmptyState';

const Analytics = () => {
  const { showError } = useToast();
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchSummary = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getSummary();
      setSummary(res.data.data);
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to load analytics');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    fetchSummary();
  }, [fetchSummary]);

  if (loading) {
    return (
      <div className="animate-fade">
        <DashboardSkeleton />
      </div>
    );
  }

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

  const topCategories = [...pieData].sort((a, b) => b.value - a.value).slice(0, 5);

  return (
    <div className="animate-fade">
      <div className="mb-4">
        <h2 className="page-title mb-1">Analytics</h2>
        <p className="page-subtitle mb-0">Insights into your financial habits.</p>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6 col-xl-3">
          <StatCard
            icon={FaWallet}
            label="Total Balance"
            value={formatCurrency(summary?.totals?.totalBalance)}
            color="#6366f1"
            bg="rgba(99,102,241,0.1)"
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
        <div className="col-md-6 col-xl-3">
          <StatCard
            icon={FaReceipt}
            label="Transactions"
            value={summary?.transactionCount || 0}
            color="#06b6d4"
            bg="rgba(6,182,212,0.1)"
          />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-lg-6">
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-3">Income vs Expense (6 Months)</h5>
            {barData.length ? (
              <BarChart data={barData} height={320} />
            ) : (
              <EmptyState title="No data available" subtitle="Add transactions to see the comparison." />
            )}
          </div>
        </div>
        <div className="col-lg-6">
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-3">Balance Trend</h5>
            {lineData.some((d) => d.balance !== 0) ? (
              <LineChart data={lineData} height={320} />
            ) : (
              <EmptyState title="No data available" subtitle="Your balance trend will appear here." />
            )}
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-3">Category Wise Expenses</h5>
            {pieData.length ? (
              <PieChart data={pieData} height={320} />
            ) : (
              <EmptyState title="No expense data" subtitle="Add expenses to see the breakdown." />
            )}
          </div>
        </div>

        <div className="col-lg-6">
          <div className="glass-card p-4 h-100">
            <h5 className="fw-bold mb-3">Top Spending Categories</h5>
            {topCategories.length ? (
              <div className="d-flex flex-column gap-3">
                {topCategories.map((cat) => {
                  const category = getCategory(cat.name);
                  const Icon = category.icon;
                  const max = topCategories[0].value;
                  const pct = (cat.value / max) * 100;
                  const totalExpense = summary?.totals?.totalExpense || 1;
                  const share = ((cat.value / totalExpense) * 100).toFixed(1);
                  return (
                    <div key={cat.name}>
                      <div className="d-flex align-items-center justify-content-between mb-1">
                        <div className="d-flex align-items-center gap-2">
                          <div className="stat-icon" style={{ width: '36px', height: '36px', background: `${cat.color}20`, color: cat.color }}>
                            <Icon />
                          </div>
                          <span className="fw-semibold">{cat.name}</span>
                        </div>
                        <div className="text-end">
                          <p className="mb-0 fw-bold">{formatCurrency(cat.value)}</p>
                          <small className="text-muted">{share}%</small>
                        </div>
                      </div>
                      <div className="progress" style={{ height: '6px', borderRadius: '4px' }}>
                        <div
                          className="progress-bar"
                          style={{ width: `${pct}%`, background: cat.color, borderRadius: '4px' }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <EmptyState
                icon={FaChartPie}
                title="No spending data"
                subtitle="Add expenses to see your top spending categories."
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
