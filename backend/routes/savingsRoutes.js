const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
} = require('../controllers/savingsController');
const protect = require('../middleware/auth');

router.use(protect);

const validateGoal = [
  body('name').trim().notEmpty().withMessage('Goal name is required'),
  body('targetAmount')
    .isFloat({ gt: 0 })
    .withMessage('Target amount must be a positive number'),
  body('currentAmount')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Current amount cannot be negative'),
  body('deadline').notEmpty().withMessage('Deadline is required'),
];

router.route('/').get(getGoals).post(validateGoal, createGoal);

router.route('/:id').put(updateGoal).delete(deleteGoal);

module.exports = router;
