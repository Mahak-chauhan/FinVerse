import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';

import Layout from './components/Layout/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Analytics from './pages/Analytics';
import Savings from './pages/Savings';
import HealthScore from './pages/HealthScore';
import CreditCheck from './pages/CreditCheck';
import LoanMarketplace from './pages/LoanMarketplace';
import Academy from './pages/Academy';
import CourseDetail from './pages/CourseDetail';
import AiMentor from './pages/AiMentor';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import PrivateRoute from './utils/PrivateRoute';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div className="app-loading">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/login" element={<PublicOnlyRoute><Login /></PublicOnlyRoute>} />
      <Route path="/register" element={<PublicOnlyRoute><Register /></PublicOnlyRoute>} />

<Route element={<PrivateRoute><Layout /></PrivateRoute>}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/savings" element={<Savings />} />
        <Route path="/health-score" element={<HealthScore />} />
        <Route path="/credit-check" element={<CreditCheck />} />
        <Route path="/loans" element={<LoanMarketplace />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/academy/:id" element={<CourseDetail />} />
        <Route path="/ai-mentor" element={<AiMentor />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const PublicOnlyRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/" replace /> : children;
};

export default App;
