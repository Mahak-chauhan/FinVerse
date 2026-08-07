const Conversation = require('../models/Conversation');
const { generateMentorReply } = require('../services/mentorService');

const listConversations = async (req, res, next) => {
  try {
    const conversations = await Conversation.find({ user: req.user._id }).sort({
      updatedAt: -1,
    });

    res.status(200).json({
      status: 'success',
      data: conversations,
    });
  } catch (error) {
    next(error);
  }
};

const createConversation = async (req, res, next) => {
  try {
    const { title = 'New Conversation' } = req.body;

    const conversation = await Conversation.create({
      user: req.user._id,
      title,
    });

    res.status(201).json({
      status: 'success',
      data: conversation,
    });
  } catch (error) {
    next(error);
  }
};

const getConversation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!conversation) {
      return res.status(404).json({
        status: 'error',
        message: 'Conversation not found',
      });
    }

    res.status(200).json({
      status: 'success',
      data: conversation,
    });
  } catch (error) {
    next(error);
  }
};

const deleteConversation = async (req, res, next) => {
  try {
    const { id } = req.params;

    const conversation = await Conversation.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });

    if (!conversation) {
      return res.status(404).json({
        status: 'error',
        message: 'Conversation not found',
      });
    }

    res.status(200).json({
      status: 'success',
      message: 'Conversation deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

const sendMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { content } = req.body;

    const conversation = await Conversation.findOne({
      _id: id,
      user: req.user._id,
    });

    if (!conversation) {
      return res.status(404).json({
        status: 'error',
        message: 'Conversation not found',
      });
    }

    conversation.messages.push({ role: 'user', content });

    if (conversation.messages.length === 1) {
      const title = content.slice(0, 40);
      conversation.title = title + (content.length > 40 ? '...' : '');
    }

    const history = conversation.messages.map((m) => ({
      role: m.role,
      content: m.content,
    }));

    const { text } = await generateMentorReply(history);

    conversation.messages.push({ role: 'assistant', content: text });
    await conversation.save();

    res.status(200).json({
      status: 'success',
      data: {
        user: content,
        assistant: text,
        messages: conversation.messages,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listConversations,
  createConversation,
  getConversation,
  deleteConversation,
  sendMessage,
};
