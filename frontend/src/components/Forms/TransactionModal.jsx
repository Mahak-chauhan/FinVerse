import { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import { FaMoneyBillWave } from 'react-icons/fa';
import { CATEGORIES } from '../../utils/constants';
import { formatDateInput } from '../../utils/formatters';

const TransactionModal = ({ show, onClose, onSubmit, editing }) => {
  const [formData, setFormData] = useState({
    title: '',
    type: 'expense',
    amount: '',
    category: '',
    date: formatDateInput(new Date()),
    description: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editing) {
      setFormData({
        title: editing.title || '',
        type: editing.type || 'expense',
        amount: editing.amount || '',
        category: editing.category || '',
        date: formatDateInput(editing.date),
        description: editing.description || '',
      });
    } else {
      setFormData({
        title: '',
        type: 'expense',
        amount: '',
        category: '',
        date: formatDateInput(new Date()),
        description: '',
      });
    }
    setErrors({});
  }, [editing, show]);

  const handleTypeChange = (type) => {
    setFormData((prev) => ({ ...prev, type, category: '' }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.title.trim()) errs.title = 'Title is required';
    if (!formData.amount || Number(formData.amount) <= 0) errs.amount = 'Enter a valid amount';
    if (!formData.category) errs.category = 'Select a category';
    if (!formData.date) errs.date = 'Select a date';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSubmit({
      title: formData.title.trim(),
      type: formData.type,
      amount: Number(formData.amount),
      category: formData.category,
      date: new Date(formData.date).toISOString(),
      description: formData.description.trim(),
    });
  };

  const categories = CATEGORIES[formData.type] || [];

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="border-0 pb-0">
        <Modal.Title className="d-flex align-items-center gap-2">
          <div className="stat-icon" style={{ background: 'rgba(99,102,241,0.1)', color: '#6366f1' }}>
            <FaMoneyBillWave />
          </div>
          <span>{editing ? 'Edit Transaction' : 'Add Transaction'}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <div className="btn-group w-100 mb-3" role="group">
            <button
              type="button"
              className={`btn flex-fill ${formData.type === 'income' ? 'btn-success' : 'btn-outline-secondary'}`}
              onClick={() => handleTypeChange('income')}
            >
              Income
            </button>
            <button
              type="button"
              className={`btn flex-fill ${formData.type === 'expense' ? 'btn-danger' : 'btn-outline-secondary'}`}
              onClick={() => handleTypeChange('expense')}
            >
              Expense
            </button>
          </div>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Monthly Salary"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              isInvalid={!!errors.title}
            />
            <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Amount (₹)</Form.Label>
            <Form.Control
              type="number"
              placeholder="0.00"
              min="0.01"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              isInvalid={!!errors.amount}
            />
            <Form.Control.Feedback type="invalid">{errors.amount}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Category</Form.Label>
            <Form.Select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              isInvalid={!!errors.category}
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.name} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">{errors.category}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Date</Form.Label>
            <Form.Control
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              isInvalid={!!errors.date}
            />
            <Form.Control.Feedback type="invalid">{errors.date}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Description (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              placeholder="Add a note..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </Form.Group>

          <div className="d-flex gap-2">
            <button type="submit" className="btn-gradient flex-grow-1">
              {editing ? 'Update Transaction' : 'Add Transaction'}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={onClose}>
              Cancel
            </button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TransactionModal;
