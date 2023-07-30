import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState('');

  return (
    <AppContext.Provider value={{ showAlert, setShowAlert }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
