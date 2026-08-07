const express = require('express');
const router = express.Router();

const { getCourses, getCourseById } = require('../controllers/courseController');
const protect = require('../middleware/auth');

router.use(protect);

router.get('/', getCourses);
router.get('/:id', getCourseById);

module.exports = router;
