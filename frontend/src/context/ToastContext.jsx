import { createContext, useCallback } from 'react';
import { toast } from 'react-toastify';

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const showSuccess = useCallback((message) => {
    toast.success(message, {
      position: 'top-right',
      autoClose: 3000,
    });
  }, []);

  const showError = useCallback((message) => {
    toast.error(message, {
      position: 'top-right',
      autoClose: 4000,
    });
  }, []);

  const showInfo = useCallback((message) => {
    toast.info(message, {
      position: 'top-right',
      autoClose: 3000,
    });
  }, []);

  return (
    <ToastContext.Provider value={{ showSuccess, showError, showInfo }}>
      {children}
    </ToastContext.Provider>
  );
};
