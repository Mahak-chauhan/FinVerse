import { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaExchangeAlt } from 'react-icons/fa';
import { useToast } from '../hooks/useToast';
import useTransactions from '../hooks/useTransactions';
import { formatCurrency, formatDate } from '../utils/formatters';
import { getCategory, ALL_CATEGORIES } from '../utils/constants';

import TransactionModal from '../components/Forms/TransactionModal';
import { TableSkeleton } from '../components/Loader/Skeleton';
import EmptyState from '../components/EmptyState/EmptyState';

const PAGE_SIZE = 8;

const Transactions = () => {
  const { showSuccess, showError } = useToast();
  const {
    transactions,
    loading,
    pagination,
    fetchTransactions,
    create,
    update,
    remove,
  } = useTransactions();

  const [filters, setFilters] = useState({
    search: '',
    type: '',
    category: '',
    dateFrom: '',
    dateTo: '',
    page: 1,
  });

  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);

  const loadTransactions = useCallback(() => {
    const params = {
      search: filters.search || undefined,
      type: filters.type || undefined,
      category: filters.category || undefined,
      dateFrom: filters.dateFrom || undefined,
      dateTo: filters.dateTo || undefined,
      page: filters.page,
      limit: PAGE_SIZE,
    };
    fetchTransactions(params).catch((error) => {
      showError(error.response?.data?.message || 'Failed to load transactions');
    });
  }, [filters, fetchTransactions, showError]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const resetFilters = () => {
    setFilters({ search: '', type: '', category: '', dateFrom: '', dateTo: '', page: 1 });
  };

  const handleSubmit = async (data) => {
    try {
      if (editing) {
        await update(editing._id, data);
        showSuccess('Transaction updated successfully');
      } else {
        await create(data);
        showSuccess('Transaction added successfully');
      }
      setShowModal(false);
      setEditing(null);
      loadTransactions();
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to save transaction');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) return;
    try {
      await remove(id);
      showSuccess('Transaction deleted');
      loadTransactions();
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to delete transaction');
    }
  };

  const handleEdit = (transaction) => {
    setEditing(transaction);
    setShowModal(true);
  };

  return (
    <div className="animate-fade">
      <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
        <div>
          <h2 className="page-title mb-1">Transactions</h2>
          <p className="page-subtitle mb-0">Manage all your income and expenses.</p>
        </div>
        <button className="btn-gradient btn d-flex align-items-center gap-2 mt-2 mt-md-0" onClick={() => { setEditing(null); setShowModal(true); }}>
          <FaPlus />
          Add Transaction
        </button>
      </div>

      <div className="glass-card p-3 mb-4">
        <div className="row g-2 align-items-end">
          <div className="col-md-4">
            <div className="input-group">
              <span className="input-group-text bg-transparent">
                <FaSearch className="text-muted" />
              </span>
              <input
                type="text"
                className="form-control"
                placeholder="Search transactions..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>
          <div className="col-md-2">
            <select
              className="form-select"
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {ALL_CATEGORIES.map((cat) => (
                <option key={cat.name} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={filters.dateFrom}
              onChange={(e) => handleFilterChange('dateFrom', e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control"
              value={filters.dateTo}
              onChange={(e) => handleFilterChange('dateTo', e.target.value)}
            />
          </div>
        </div>
        {(filters.search || filters.type || filters.category || filters.dateFrom || filters.dateTo) && (
          <div className="mt-2 text-end">
            <button className="btn btn-sm btn-outline-secondary" onClick={resetFilters}>
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {loading ? (
        <TableSkeleton rows={PAGE_SIZE} />
      ) : transactions.length ? (
        <div className="glass-card p-0 overflow-hidden">
          <div className="table-responsive">
            <table className="table table-modern table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Transaction</th>
                  <th>Category</th>
                  <th>Type</th>
                  <th>Date</th>
                  <th className="text-end">Amount</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((t) => {
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
                            {t.description && <small className="text-muted">{t.description}</small>}
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="category-chip" style={{ background: `${cat.color}20`, color: cat.color }}>
                          {t.category}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${t.type === 'income' ? 'badge-income' : 'badge-expense'}`}>
                          {t.type}
                        </span>
                      </td>
                      <td className="text-muted">{formatDate(t.date)}</td>
                      <td className={`text-end fw-bold ${t.type === 'income' ? 'text-success' : 'text-danger'}`}>
                        {t.type === 'income' ? '+' : '-'}
                        {formatCurrency(t.amount)}
                      </td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center gap-2">
                          <button className="btn btn-sm btn-outline-primary" onClick={() => handleEdit(t)} title="Edit">
                            <FaEdit />
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(t._id)} title="Delete">
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="d-flex align-items-center justify-content-between p-3 border-top">
              <p className="mb-0 text-muted small">
                Showing page {pagination.page} of {pagination.totalPages} ({pagination.total} transactions)
              </p>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-outline-primary"
                  disabled={filters.page <= 1}
                  onClick={() => setFilters((prev) => ({ ...prev, page: prev.page - 1 }))}
                >
                  Previous
                </button>
                <button
                  className="btn btn-sm btn-outline-primary"
                  disabled={filters.page >= pagination.totalPages}
                  onClick={() => setFilters((prev) => ({ ...prev, page: prev.page + 1 }))}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          icon={FaExchangeAlt}
          title="No transactions found"
          subtitle="Try adjusting your filters or add a new transaction."
          action={
            <button className="btn-gradient btn" onClick={() => { setEditing(null); setShowModal(true); }}>
              <FaPlus className="me-1" /> Add Transaction
            </button>
          }
        />
      )}

      <TransactionModal
        show={showModal}
        onClose={() => { setShowModal(false); setEditing(null); }}
        editing={editing}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default Transactions;
