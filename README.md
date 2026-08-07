# 💰 FinVerse

**FinVerse** is a full-stack personal finance companion built with the **MERN stack** (MongoDB, Express.js, React.js, Node.js). It combines everyday expense tracking with smart features like a savings vault, financial health scoring, credit analysis, a loan marketplace, an AI financial mentor, and an interactive learning academy — all wrapped in a premium glassmorphism UI.

![Stack](https://img.shields.io/badge/Stack-MERN-blueviolet)
![UI](https://img.shields.io/badge/UI-Glassmorphism-6366f1)
![License](https://img.shields.io/badge/License-MIT-green)

---

## ✨ Features

### 🔐 Authentication
- Register & login with JWT
- Secure password hashing (bcrypt)
- Protected routes & auto-login via token persistence
- Profile management & password update

### 📊 Dashboard
- Total balance, income & expense cards
- Monthly income vs expense summary
- Quick-access cards for Health Score, Credit, Savings & Loans
- AI Insight Cards with proactive financial tips
- Pie, bar & line charts
- Recent transactions & welcome greeting

### 💸 Transactions
- Add / edit / delete income & expense
- Search, filter by type, category & date range
- Pagination & category-based icons

### 📈 Charts & Analytics
- Monthly spending trends
- Category-wise expense breakdown
- Balance trend over 6 months
- Top spending categories

### 🐷 Smart Savings Vault
- Create & track savings goals
- Target amount, current progress & deadlines
- Overall vault balance & progress bar

### 🩺 Financial Health Score
- FinVerse Index score (0–100)
- Savings rate, expense ratio & emergency fund months
- AI-generated action plan with tier badges

### 💳 Credit Check
- Credit score (300–900 scale)
- Risk level & loan approval probability
- Data security highlights

### 🏦 Loan Marketplace
- Instant eligibility check
- Curated offers from leading lenders
- Suggested loan amount, interest rate & EMI

### 🎓 Academy / Learning Hub
- Hand-crafted financial courses
- Interactive lessons with quizzes
- Progress tracking & difficulty levels

### 🤖 AI Financial Mentor
- Chat-based financial advice
- Conversation history
- Gemini-powered responses with smart fallback

### 👤 Profile Management
- Update name, change password, logout

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React (Vite), React Router, Axios, Bootstrap 5, React Icons, Recharts, Context API |
| **Backend** | Node.js, Express, MongoDB Atlas, Mongoose, JWT, bcrypt, Express Validator, Google Generative AI |
| **UI** | Glassmorphism, custom CSS, smooth animations, fully responsive |

---

## 📁 Folder Structure

```
FinVerse/
├── frontend/
│   ├── public/
│   └── src/
│       ├── apis/          # Axios instance & interceptors
│       ├── components/     # Layout, cards, charts, forms, loaders
│       ├── context/        # Auth & Toast contexts
│       ├── hooks/          # useAuth, useToast, useTransactions
│       ├── pages/          # Route-level screens
│       ├── services/       # API service modules
│       ├── utils/          # Formatters, constants, route guards
│       ├── App.jsx
│       └── main.jsx
│
├── backend/
│   ├── config/            # DB connection
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Auth & error handling
│   ├── models/            # Mongoose schemas
│   ├── routes/            # Express routers
│   ├── services/          # Business logic (scores, AI mentor)
│   ├── utils/             # Helpers
│   ├── server.js
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MongoDB Atlas account (or local MongoDB)
- npm

### 1. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=30d
CLIENT_URL=http://localhost:5173
GEMINI_API_KEY=your_google_gemini_api_key   # optional, enables AI mentor
```

Run the backend:
```bash
npm run dev
```

### 2. Frontend Setup
Open a new terminal:
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
VITE_API_URL=http://localhost:5000/api
```

Run the frontend:
```bash
npm run dev
```

Visit **http://localhost:5173** in your browser.

---

## 📚 API Overview

### Authentication
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/auth/register` | Register a new user | ❌ |
| POST | `/api/auth/login` | Login user | ❌ |
| GET | `/api/auth/me` | Get current user | ✅ |

### Transactions
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/transactions` | List transactions (filters) | ✅ |
| POST | `/api/transactions` | Create transaction | ✅ |
| PUT | `/api/transactions/:id` | Update transaction | ✅ |
| DELETE | `/api/transactions/:id` | Delete transaction | ✅ |
| GET | `/api/transactions/summary` | Analytics summary | ✅ |

### Users
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| PUT | `/api/users/profile` | Update name | ✅ |
| PUT | `/api/users/password` | Update password | ✅ |

### Savings
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/savings` | List goals | ✅ |
| POST | `/api/savings` | Create goal | ✅ |
| PUT | `/api/savings/:id` | Update goal | ✅ |
| DELETE | `/api/savings/:id` | Delete goal | ✅ |

### Scores
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/scores/health` | Financial health score | ✅ |
| GET | `/api/scores/credit` | Credit score | ✅ |

### Loans
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| POST | `/api/loans/check` | Check loan eligibility | ✅ |
| GET | `/api/loans/history` | Previous checks | ✅ |

### Courses
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/courses` | List courses | ✅ |
| GET | `/api/courses/:id` | Course detail | ✅ |

### AI Mentor
| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/mentor` | List conversations | ✅ |
| POST | `/api/mentor` | Create conversation | ✅ |
| GET | `/api/mentor/:id` | Get conversation | ✅ |
| DELETE | `/api/mentor/:id` | Delete conversation | ✅ |
| POST | `/api/mentor/:id/messages` | Send message | ✅ |

---

## 🌟 UI/UX Highlights
- Soft blue & purple gradient theme
- Glassmorphism cards with smooth hover effects
- Recharts visualizations
- Fully responsive layout (desktop / tablet / mobile)
- Skeleton loading states & toast notifications

---

## 🔮 Future Scope
- Recurring transaction automation
- Multi-currency support
- Budget limits & alerts
- Investment portfolio tracking
- Real-time market data
- Bank account & UPI integration
- Mobile application (React Native)
- Enhanced AI insights & forecasting

---

## 📄 License
This project is licensed under the MIT License.
