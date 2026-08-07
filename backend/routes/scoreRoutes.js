const express = require('express');
const router = express.Router();

const {
  getHealthScore,
  getCreditInfo,
} = require('../controllers/scoreController');
const protect = require('../middleware/auth');

router.use(protect);

router.get('/health', getHealthScore);
router.get('/credit', getCreditInfo);

module.exports = router;
