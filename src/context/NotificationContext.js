import React, { createContext, useState, useContext } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
  const [data, setData] = useState('')

  return (
    <NotificationContext.Provider value={{ data, setData }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationContext = () => useContext(NotificationContext)
