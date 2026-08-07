const mongoose = require('mongoose');

const loanCheckSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    monthlyIncome: {
      type: Number,
      required: true,
    },
    employmentType: {
      type: String,
      required: true,
    },
    existingLoanEmi: {
      type: Number,
      default: 0,
    },
    monthlyExpenses: {
      type: Number,
      required: true,
    },
    loanAmount: {
      type: Number,
    },
    approvalPercentage: {
      type: Number,
      required: true,
    },
    suggestedLoanAmount: {
      type: Number,
      required: true,
    },
    result: {
      type: mongoose.Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('LoanCheck', loanCheckSchema);
