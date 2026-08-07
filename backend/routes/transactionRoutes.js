const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getSummary,
} = require('../controllers/transactionController');
const protect = require('../middleware/auth');

router.use(protect);

const validateTransaction = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('type')
    .isIn(['income', 'expense'])
    .withMessage('Type must be income or expense'),
  body('amount')
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number'),
  body('category').trim().notEmpty().withMessage('Category is required'),
];

const validateUpdate = [
  body('title').optional().trim().notEmpty().withMessage('Title is required'),
  body('type')
    .optional()
    .isIn(['income', 'expense'])
    .withMessage('Type must be income or expense'),
  body('amount')
    .optional()
    .isFloat({ gt: 0 })
    .withMessage('Amount must be a positive number'),
  body('category')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Category is required'),
];

router.get('/summary', getSummary);

router
  .route('/')
  .get(getTransactions)
  .post(validateTransaction, createTransaction);

router
  .route('/:id')
  .put(validateUpdate, updateTransaction)
  .delete(deleteTransaction);

module.exports = router;
