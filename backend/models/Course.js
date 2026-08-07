const mongoose = require('mongoose');

const lessonSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    orderIndex: {
      type: Number,
      required: true,
    },
    quiz: [
      {
        question: { type: String, required: true },
        options: [{ type: String, required: true }],
        answer: { type: Number, required: true },
      },
    ],
  },
  { _id: true }
);

const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner',
    },
    readingTimeMinutes: {
      type: Number,
      default: 10,
    },
    description: {
      type: String,
      required: true,
    },
    lessons: {
      type: [lessonSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', courseSchema);
