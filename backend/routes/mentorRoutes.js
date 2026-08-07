const express = require('express');
const { body } = require('express-validator');
const router = express.Router();

const {
  listConversations,
  createConversation,
  getConversation,
  deleteConversation,
  sendMessage,
} = require('../controllers/mentorController');
const protect = require('../middleware/auth');

router.use(protect);

const validateMessage = [
  body('content').trim().notEmpty().withMessage('Message is required'),
];

router.get('/', listConversations);
router.post('/', createConversation);

router.get('/:id', getConversation);
router.delete('/:id', deleteConversation);
router.post('/:id/messages', validateMessage, sendMessage);

module.exports = router;
