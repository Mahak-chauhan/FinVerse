const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const savingsRoutes = require('./routes/savingsRoutes');
const scoreRoutes = require('./routes/scoreRoutes');
const loanRoutes = require('./routes/loanRoutes');
const courseRoutes = require('./routes/courseRoutes');
const mentorRoutes = require('./routes/mentorRoutes');
const { seedCoursesIfEmpty } = require('./controllers/courseController');

connectDB().then(() => {
  seedCoursesIfEmpty();
});

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);

app.use(express.json());

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.json({
    message: 'Finance Tracker API is running',
    docs: '/api-docs',
    health: 'OK',
  });
});

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'Server is healthy' });
});

app.use('/api/auth', authRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/users', userRoutes);
app.use('/api/savings', savingsRoutes);
app.use('/api/scores', scoreRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/mentor', mentorRoutes);

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});
