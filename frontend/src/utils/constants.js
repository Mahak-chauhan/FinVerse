import {
  FaUtensils,
  FaShoppingCart,
  FaHouseUser,
  FaCar,
  FaPlane,
  FaHeartbeat,
  FaGraduationCap,
  FaGamepad,
  FaTshirt,
  FaWallet,
  FaBriefcase,
  FaPiggyBank,
  FaGift,
  FaEllipsisH,
} from 'react-icons/fa';

export const CATEGORIES = {
  income: [
    { name: 'Salary', icon: FaWallet, color: '#10b981' },
    { name: 'Freelance', icon: FaBriefcase, color: '#06b6d4' },
    { name: 'Investments', icon: FaPiggyBank, color: '#8b5cf6' },
    { name: 'Business', icon: FaBriefcase, color: '#f59e0b' },
    { name: 'Other Income', icon: FaGift, color: '#14b8a6' },
  ],
  expense: [
    { name: 'Food', icon: FaUtensils, color: '#ef4444' },
    { name: 'Groceries', icon: FaShoppingCart, color: '#f97316' },
    { name: 'Rent', icon: FaHouseUser, color: '#8b5cf6' },
    { name: 'Transport', icon: FaCar, color: '#06b6d4' },
    { name: 'Travel', icon: FaPlane, color: '#3b82f6' },
    { name: 'Health', icon: FaHeartbeat, color: '#ec4899' },
    { name: 'Education', icon: FaGraduationCap, color: '#14b8a6' },
    { name: 'Entertainment', icon: FaGamepad, color: '#a855f7' },
    { name: 'Shopping', icon: FaTshirt, color: '#f43f5e' },
    { name: 'Utilities', icon: FaHouseUser, color: '#64748b' },
    { name: 'Other', icon: FaEllipsisH, color: '#78716c' },
  ],
};

export const ALL_CATEGORIES = [...CATEGORIES.income, ...CATEGORIES.expense];

export const getCategory = (name) => {
  return (
    ALL_CATEGORIES.find((c) => c.name === name) || {
      name,
      icon: FaEllipsisH,
      color: '#78716c',
    }
  );
};

export const CHART_COLORS = [
  '#6366f1',
  '#8b5cf6',
  '#06b6d4',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#ec4899',
  '#3b82f6',
  '#14b8a6',
  '#a855f7',
  '#f43f5e',
  '#64748b',
];
