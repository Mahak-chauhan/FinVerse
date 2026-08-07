import { useState, useCallback } from 'react';
import {
  getTransactions as apiGetTransactions,
  createTransaction as apiCreate,
  updateTransaction as apiUpdate,
  deleteTransaction as apiDelete,
} from '../services/transactionService';

const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({ total: 0, totalPages: 0, page: 1 });

  const fetchTransactions = useCallback(async (params = {}) => {
    setLoading(true);
    try {
      const res = await apiGetTransactions(params);
      setTransactions(res.data.data.transactions);
      setPagination(res.data.data.pagination);
      return res.data.data;
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  const create = useCallback(async (data) => {
    const res = await apiCreate(data);
    return res.data;
  }, []);

  const update = useCallback(async (id, data) => {
    const res = await apiUpdate(id, data);
    return res.data;
  }, []);

  const remove = useCallback(async (id) => {
    const res = await apiDelete(id);
    return res.data;
  }, []);

  return {
    transactions,
    setTransactions,
    loading,
    pagination,
    fetchTransactions,
    create,
    update,
    remove,
  };
};

export default useTransactions;
