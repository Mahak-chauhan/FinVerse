const LoanCheck = require('../models/LoanCheck');

const LENDERS = [
  { name: 'HDFC Bank', baseRate: 10.5, minScore: 60 },
  { name: 'SBI', baseRate: 11.0, minScore: 50 },
  { name: 'ICICI Bank', baseRate: 11.5, minScore: 60 },
  { name: 'Axis Bank', baseRate: 12.0, minScore: 55 },
  { name: 'Bajaj Finserv', baseRate: 13.5, minScore: 40 },
  { name: 'LoanTap', baseRate: 15.0, minScore: 30 },
];

const calcEmi = (principal, annualRatePercent, months) => {
  const r = annualRatePercent / 12 / 100;
  if (r === 0) return principal / months;
  return (
    (principal * r * Math.pow(1 + r, months)) /
    (Math.pow(1 + r, months) - 1)
  );
};

const checkEligibility = async (req, res, next) => {
  try {
    const {
      monthlyIncome,
      employmentType,
      monthlyExpenses,
      existingLoanEmi = 0,
      loanAmount,
    } = req.body;

    let eligibilityScore = 50;

    if (monthlyIncome >= 100000) eligibilityScore += 20;
    else if (monthlyIncome >= 50000) eligibilityScore += 15;
    else if (monthlyIncome >= 25000) eligibilityScore += 8;
    else if (monthlyIncome < 10000) eligibilityScore -= 15;

    const employmentBonus = {
      Salaried: 15,
      'Business Owner': 10,
      'Self-Employed': 8,
      Freelancer: 3,
      Student: -10,
      Unemployed: -20,
    };
    eligibilityScore += employmentBonus[employmentType] ?? 0;

    const expRatio =
      monthlyIncome > 0
        ? (monthlyExpenses + existingLoanEmi) / monthlyIncome
        : 1;
    if (expRatio < 0.4) eligibilityScore += 15;
    else if (expRatio < 0.6) eligibilityScore += 8;
    else if (expRatio > 0.8) eligibilityScore -= 15;

    eligibilityScore = Math.min(100, Math.max(0, eligibilityScore));
    const approvalPercentage = eligibilityScore;

    let riskLevel = 'Very High';
    if (eligibilityScore >= 75) riskLevel = 'Low';
    else if (eligibilityScore >= 55) riskLevel = 'Medium';
    else if (eligibilityScore >= 35) riskLevel = 'High';

    const netIncome = monthlyIncome - monthlyExpenses - existingLoanEmi;
    const maxEmiCapacity = Math.max(netIncome * 0.4, 0);
    const tenure = 36;
    const baseRate = 11.5;
    const r = baseRate / 12 / 100;
    const suggestedLoanAmount =
      loanAmount ||
      Math.round(
        (maxEmiCapacity * (Math.pow(1 + r, tenure) - 1)) /
          (r * Math.pow(1 + r, tenure))
      );
    const interestRate = baseRate - (eligibilityScore - 50) * 0.05;
    const estimatedEmi = calcEmi(suggestedLoanAmount, interestRate, tenure);

    const offers = LENDERS.filter((l) => eligibilityScore >= l.minScore)
      .slice(0, 4)
      .map((l) => {
        const rate = l.baseRate - (eligibilityScore - 50) * 0.03;
        const emi = calcEmi(suggestedLoanAmount, rate, tenure);
        return {
          lenderName: l.name,
          amount: suggestedLoanAmount,
          interestRate: Math.round(rate * 10) / 10,
          tenureMonths: tenure,
          emi: Math.round(emi),
          processingFee: Math.round(suggestedLoanAmount * 0.01),
        };
      });

    const result = {
      approvalPercentage,
      riskLevel,
      suggestedLoanAmount: Math.round(suggestedLoanAmount),
      interestRate: Math.round(interestRate * 10) / 10,
      estimatedEmi: Math.round(estimatedEmi),
      offers,
    };

    await LoanCheck.create({
      user: req.user._id,
      monthlyIncome,
      employmentType,
      existingLoanEmi,
      monthlyExpenses,
      loanAmount,
      approvalPercentage,
      suggestedLoanAmount: Math.round(suggestedLoanAmount),
      result,
    });

    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getHistory = async (req, res, next) => {
  try {
    const checks = await LoanCheck.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.status(200).json({
      status: 'success',
      data: checks,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { checkEligibility, getHistory };
