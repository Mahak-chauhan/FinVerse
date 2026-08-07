const mongoose = require('mongoose');

const savingsGoalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: [true, 'Goal name is required'],
      trim: true,
      maxlength: [80, 'Name cannot exceed 80 characters'],
    },
    targetAmount: {
      type: Number,
      required: [true, 'Target amount is required'],
      min: [1, 'Target amount must be greater than 0'],
    },
    currentAmount: {
      type: Number,
      default: 0,
      min: [0, 'Current amount cannot be negative'],
    },
    deadline: {
      type: String,
      required: [true, 'Deadline is required'],
    },
    emoji: {
      type: String,
      default: '🎯',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('SavingsGoal', savingsGoalSchema);
