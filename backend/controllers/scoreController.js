const { getFinancialHealth, getCreditScore } = require('../services/scoreService');

const getHealthScore = async (req, res, next) => {
  try {
    const data = await getFinancialHealth(req.user._id);

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    next(error);
  }
};

const getCreditInfo = async (req, res, next) => {
  try {
    const data = await getCreditScore(req.user._id);

    res.status(200).json({
      status: 'success',
      data,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getHealthScore, getCreditInfo };
