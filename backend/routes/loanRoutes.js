const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  checkEligibility,
  getHistory,
} = require('../controllers/loanController');
const protect = require('../middleware/auth');

router.use(protect);

const validateLoanCheck = [
  body('monthlyIncome')
    .isFloat({ gt: 0 })
    .withMessage('Monthly income must be a positive number'),
  body('employmentType')
    .trim()
    .notEmpty()
    .withMessage('Employment type is required'),
  body('monthlyExpenses')
    .isFloat({ min: 0 })
    .withMessage('Monthly expenses must be a number'),
];

router.post('/check', validateLoanCheck, checkEligibility);
router.get('/history', getHistory);

module.exports = router;
