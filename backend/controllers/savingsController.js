const SavingsGoal = require('../models/SavingsGoal');

const getGoals = async (req, res, next) => {
  try {
    const goals = await SavingsGoal.find({ user: req.user._id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      status: 'success',
      data: goals,
    });
  } catch (error) {
    next(error);
  }
};

const createGoal = async (req, res, next) => {
  try {
    const { name, targetAmount, currentAmount = 0, deadline, emoji } = req.body;

    const goal = await SavingsGoal.create({
      user: req.user._id,
      name,
      targetAmount,
      currentAmount,
      deadline,
      emoji,
    });

    res.status(201).json({
      status: 'success',
      message: 'Savings goal created successfully',
      data: goal,
    });
  } catch (error) {
    next(error);
  }
};

const updateGoal = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, targetAmount, currentAmount, deadline, emoji } = req.body;

    const goal = await SavingsGoal.findOne({ _id: id, user: req.user._id });
    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Savings goal not found',
      });
    }

    const updates = { name, targetAmount, currentAmount, deadline, emoji };
    Object.keys(updates).forEach((key) => {
      if (updates[key] === undefined) delete updates[key];
    });

    const updated = await SavingsGoal.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Savings goal updated successfully',
      data: updated,
    });
  } catch (error) {
    next(error);
  }
};

const deleteGoal = async (req, res, next) => {
  try {
    const { id } = req.params;

    const goal = await SavingsGoal.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!goal) {
      return res.status(404).json({
        status: 'error',
        message: 'Savings goal not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Savings goal deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
};
