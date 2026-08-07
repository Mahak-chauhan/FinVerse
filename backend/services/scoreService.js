const Transaction = require('../models/Transaction');

const computeMetrics = async (userId) => {
  const transactions = await Transaction.find({ user: userId });

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let totalIncome = 0;
  let totalExpense = 0;
  let monthIncome = 0;
  let monthExpense = 0;

  transactions.forEach((t) => {
    if (t.type === 'income') totalIncome += t.amount;
    else totalExpense += t.amount;

    const d = new Date(t.date);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      if (t.type === 'income') monthIncome += t.amount;
      else monthExpense += t.amount;
    }
  });

  const totalBalance = totalIncome - totalExpense;
  const monthSavings = monthIncome - monthExpense;
  const savingsRate = monthIncome > 0 ? (monthSavings / monthIncome) * 100 : 0;
  const expenseRatio = monthIncome > 0 ? (monthExpense / monthIncome) * 100 : 100;
  const emergencyFundMonths = monthExpense > 0 ? totalBalance / monthExpense : 0;

  return {
    totalIncome,
    totalExpense,
    totalBalance,
    monthIncome,
    monthExpense,
    monthSavings,
    savingsRate,
    expenseRatio,
    emergencyFundMonths,
  };
};

const computeHealthScore = (metrics) => {
  const { savingsRate, expenseRatio, emergencyFundMonths, monthIncome } = metrics;

  let score = 40;

  if (savingsRate >= 30) score += 25;
  else if (savingsRate >= 20) score += 18;
  else if (savingsRate >= 10) score += 10;
  else score += 3;

  if (expenseRatio <= 40) score += 20;
  else if (expenseRatio <= 60) score += 14;
  else if (expenseRatio <= 80) score += 7;

  if (emergencyFundMonths >= 6) score += 15;
  else if (emergencyFundMonths >= 3) score += 10;
  else if (emergencyFundMonths >= 1) score += 5;

  if (monthIncome === 0) score = Math.min(score, 30);

  return Math.min(100, Math.max(0, score));
};

const getHealthLevel = (score) => {
  if (score >= 85) return 'Platinum';
  if (score >= 70) return 'Gold';
  if (score >= 50) return 'Silver';
  return 'Bronze';
};

const buildHealthSuggestions = (metrics, score) => {
  const { savingsRate, expenseRatio, emergencyFundMonths } = metrics;
  const suggestions = [];

  if (savingsRate < 20) {
    suggestions.push('Increase your savings rate to at least 20% of monthly income');
  }
  if (expenseRatio > 70) {
    suggestions.push('Reduce expenses to below 70% of income for better financial health');
  }
  if (emergencyFundMonths < 3) {
    suggestions.push('Build an emergency fund covering 3-6 months of expenses');
  } else if (emergencyFundMonths < 6) {
    suggestions.push('Aim to expand your emergency fund to 6 months of expenses');
  }

  if (suggestions.length === 0) {
    suggestions.push('Excellent! Consider diversifying investments for long-term wealth');
  }

  return suggestions;
};

const getFinancialHealth = async (userId) => {
  const metrics = await computeMetrics(userId);
  const score = computeHealthScore(metrics);
  const level = getHealthLevel(score);
  const suggestions = buildHealthSuggestions(metrics, score);

  return {
    score,
    level,
    savingsRate: Math.round(metrics.savingsRate * 10) / 10,
    expenseRatio: Math.round(metrics.expenseRatio * 10) / 10,
    emergencyFundMonths: Math.round(metrics.emergencyFundMonths * 10) / 10,
    totalBalance: Math.round(metrics.totalBalance * 100) / 100,
    suggestions,
  };
};

const getCreditScore = async (userId) => {
  const metrics = await computeMetrics(userId);
  const healthScore = computeHealthScore(metrics);

  const score = Math.round(300 + (healthScore / 100) * 600);

  let loanApprovalChance = 'Very High';
  let riskLevel = 'Very Low Risk';

  if (score >= 800) {
    loanApprovalChance = 'Very High';
    riskLevel = 'Very Low Risk';
  } else if (score >= 700) {
    loanApprovalChance = 'High';
    riskLevel = 'Low Risk';
  } else if (score >= 600) {
    loanApprovalChance = 'Moderate';
    riskLevel = 'Medium Risk';
  } else if (score >= 500) {
    loanApprovalChance = 'Low';
    riskLevel = 'High Risk';
  } else {
    loanApprovalChance = 'Very Low';
    riskLevel = 'Very High Risk';
  }

  return {
    score,
    loanApprovalChance,
    riskLevel,
    utilizationRate: 14,
  };
};

module.exports = {
  getFinancialHealth,
  getCreditScore,
  computeMetrics,
};
