import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useEffect, useState } from 'react'
import { AuthApi } from '../api/AuthApi'

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [userData, setUserData] = useState(null)

  const login = async ({ username, password }) => {
    setIsLoading(true)

    try {
      const request = await AuthApi.post('/auth/login', {
        username,
        password
      })

      const userInfo = await request.data

      const { token } = userInfo

      setUserToken(token)
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
      AsyncStorage.setItem('userToken', token)
    } catch (error) {
      console.log('login error: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setIsLoading(true)
    setUserToken(null)
    AsyncStorage.removeItem('userToken')
    AsyncStorage.removeItem('userInfo')
    setIsLoading(false)
  }

  const isLoggedIn = async () => {
    try {
      setIsLoading(true)
      const userToken = await AsyncStorage.getItem('userToken')
      const userInfo = await AsyncStorage.getItem('userInfo')
      const userInfoData = JSON.parse(userInfo)

      if (userInfoData) {
        setUserToken(userToken)
        setUserData(userInfoData)
      }
    } catch (error) {
      console.log('isLoggedIn error: ', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, isLoading, userToken, userData }}>
      {children}
    </AuthContext.Provider>
  )
}
