import { useState, useEffect, useCallback } from 'react';
import { FaPlus, FaPiggyBank, FaTrash, FaBullseye } from 'react-icons/fa';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useToast } from '../hooks/useToast';
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} from '../services/savingsService';
import { formatCurrency } from '../utils/formatters';
import EmptyState from '../components/EmptyState/EmptyState';
import { DashboardSkeleton } from '../components/Loader/Skeleton';

const Savings = () => {
  const { showSuccess, showError } = useToast();

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: '',
    targetAmount: '',
    currentAmount: '0',
    deadline: '',
    emoji: '🎯',
  });

  const loadGoals = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getGoals();
      setGoals(res.data.data);
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to load goals');
    } finally {
      setLoading(false);
    }
  }, [showError]);

  useEffect(() => {
    loadGoals();
  }, [loadGoals]);

  const openModal = (goal = null) => {
    if (goal) {
      setEditing(goal);
      setForm({
        name: goal.name,
        targetAmount: goal.targetAmount,
        currentAmount: goal.currentAmount,
        deadline: goal.deadline,
        emoji: goal.emoji || '🎯',
      });
    } else {
      setEditing(null);
      setForm({
        name: '',
        targetAmount: '',
        currentAmount: '0',
        deadline: '',
        emoji: '🎯',
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing) {
        await updateGoal(editing._id, {
          name: form.name,
          targetAmount: Number(form.targetAmount),
          currentAmount: Number(form.currentAmount),
          deadline: form.deadline,
          emoji: form.emoji,
        });
        showSuccess('Savings goal updated');
      } else {
        await createGoal({
          name: form.name,
          targetAmount: Number(form.targetAmount),
          currentAmount: Number(form.currentAmount),
          deadline: form.deadline,
          emoji: form.emoji,
        });
        showSuccess('Savings goal created');
      }
      setShowModal(false);
      loadGoals();
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to save goal');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this savings goal?')) return;
    try {
      await deleteGoal(id);
      showSuccess('Savings goal deleted');
      loadGoals();
    } catch (error) {
      showError(error.response?.data?.message || 'Failed to delete goal');
    }
  };

  const totalSaved = goals.reduce((sum, g) => sum + g.currentAmount, 0);
  const totalTarget = goals.reduce((sum, g) => sum + g.targetAmount, 0);
  const overallProgress =
    totalTarget > 0 ? Math.min(100, (totalSaved / totalTarget) * 100) : 0;

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
          <h2 className="page-title mb-1">Smart Savings Vault</h2>
          <p className="page-subtitle mb-0">
            Track your goals and build your financial future.
          </p>
        </div>
        <button
          className="btn-gradient btn d-flex align-items-center gap-2 mt-2 mt-md-0"
          onClick={() => openModal()}
        >
          <FaPlus />
          New Goal
        </button>
      </div>

      <div className="balance-card p-4 mb-4">
        <div className="row align-items-center g-4">
          <div className="col-md-6">
            <p className="mb-1 opacity-75 small text-uppercase">
              Total Vault Balance
            </p>
            <h2 className="h2 fw-bold mb-2">{formatCurrency(totalSaved)}</h2>
            <p className="mb-0 opacity-75 small">
              Targeting {formatCurrency(totalTarget)} across {goals.length}{' '}
              active {goals.length === 1 ? 'goal' : 'goals'}.
            </p>
          </div>
          <div className="col-md-6">
            <div className="d-flex justify-content-between small fw-semibold mb-2">
              <span>Overall Progress</span>
              <span>{overallProgress.toFixed(1)}%</span>
            </div>
            <div
              className="progress"
              style={{ height: '12px', borderRadius: '8px' }}
            >
              <div
                className="progress-bar"
                style={{
                  width: `${overallProgress}%`,
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.9)',
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {goals.length ? (
        <div className="row g-4">
          {goals.map((goal) => {
            const progress = Math.min(
              100,
              (goal.currentAmount / goal.targetAmount) * 100
            );
            const isComplete = progress >= 100;
            return (
              <div className="col-md-6 col-xl-4" key={goal._id}>
                <div className="glass-card p-4 h-100">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <div className="d-flex align-items-center gap-3">
                      <div
                        className="stat-icon"
                        style={{ background: 'rgba(99,102,241,0.1)', fontSize: '24px' }}
                      >
                        {goal.emoji || '🎯'}
                      </div>
                      <div>
                        <h6 className="fw-bold mb-0">{goal.name}</h6>
                        <small className="text-muted">
                          Due{' '}
                          {new Date(goal.deadline).toLocaleDateString('en-IN', {
                            month: 'short',
                            year: 'numeric',
                          })}
                        </small>
                      </div>
                    </div>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(goal._id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="d-flex justify-content-between align-items-end mb-2">
                    <div>
                      <p className="h5 fw-bold mb-0">
                        {formatCurrency(goal.currentAmount)}
                      </p>
                      <small className="text-muted">
                        of {formatCurrency(goal.targetAmount)}
                      </small>
                    </div>
                    <span
                      className={`fw-bold ${isComplete ? 'text-success' : ''}`}
                    >
                      {progress.toFixed(0)}%
                    </span>
                  </div>
                  <div className="progress" style={{ height: '8px', borderRadius: '6px' }}>
                    <div
                      className={`progress-bar ${isComplete ? 'bg-success' : ''}`}
                      style={{ width: `${progress}%`, borderRadius: '6px' }}
                    />
                  </div>

                  <button
                    className="btn btn-outline-gradient btn-sm w-100 mt-3"
                    onClick={() => openModal(goal)}
                  >
                    Update Progress
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
<EmptyState
          icon={FaBullseye}
          title="No savings goals yet"
          subtitle="Create your first goal to start tracking your progress toward your financial milestones."
          action={
            <button className="btn-gradient btn" onClick={() => openModal()}>
              <FaPiggyBank className="me-1" /> Create First Goal
            </button>
          }
        />
      )}

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="d-flex align-items-center gap-2">
            <div
              className="stat-icon"
              style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}
            >
              <FaPiggyBank />
            </div>
            <span>{editing ? 'Edit Savings Goal' : 'Create Savings Goal'}</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="row g-3 mb-3">
              <div className="col-3">
                <Form.Label className="fw-semibold">Icon</Form.Label>
                <Form.Control
                  type="text"
                  value={form.emoji}
                  onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                  className="text-center"
                />
              </div>
              <div className="col-9">
                <Form.Label className="fw-semibold">Goal Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="e.g. House Downpayment"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="row g-3 mb-3">
              <div className="col-6">
                <Form.Label className="fw-semibold">
                  Target Amount (₹)
                </Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  step="1"
                  value={form.targetAmount}
                  onChange={(e) =>
                    setForm({ ...form, targetAmount: e.target.value })
                  }
                  required
                />
              </div>
              <div className="col-6">
                <Form.Label className="fw-semibold">
                  Current Amount (₹)
                </Form.Label>
                <Form.Control
                  type="number"
                  min="0"
                  step="1"
                  value={form.currentAmount}
                  onChange={(e) =>
                    setForm({ ...form, currentAmount: e.target.value })
                  }
                />
              </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">Target Date</Form.Label>
              <Form.Control
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <button type="submit" className="btn-gradient flex-grow-1">
                {editing ? 'Update Goal' : 'Create Goal'}
              </button>
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Savings;
