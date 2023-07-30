import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useEffect, useState } from 'react'
import { VoicePilotApi } from '../api/VoicePilotApi'
import CustomAlert from '../components/CustomAlert';

export const AuthContext = createContext()

export function AuthProvider ({ children }) {
  const [isLoading, setIsLoading] = useState(false)
  const [userToken, setUserToken] = useState(null)
  const [userData, setUserData] = useState(null)
  const [showAlert, setShowAlert] = useState('');

  const login = async ({ username, password }) => {
    setIsLoading(true)

    try {
      const request = await VoicePilotApi.post('/auth/login', {
        username,
        password
      })

      const userInfo = await request.data

      const { token } = userInfo

      setUserToken(token)
      setUserData(userInfo)
      AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
      AsyncStorage.setItem('userToken', token)
    } catch (error) {
      if(error.response.status == 401){
        setShowAlert('Credenciales incorrectas');
      }else{
        setShowAlert('Error al iniciar la sesión');
      }
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

  const register = async ({ username, password, email }) => {
    setIsLoading(true)

    try {
      const request = await VoicePilotApi.post('/auth/register', {
        username,
        password,
        email
      })

      const data = await request.data

      console.log(data)
      setShowAlert('¡Usuario registrado con éxito!');
    } catch (error) {
      if(error.response.status == 400){
        setShowAlert('Correo ya existente');
      }else{
        setShowAlert('Error al procesar el registro');
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    isLoggedIn()
  }, [])

  return (
    <AuthContext.Provider value={{ login, logout, register, isLoading, userToken, userData }}>
      {children}
      {showAlert && (
        <CustomAlert
          message={showAlert}
          onClose={() => setShowAlert('')}
        />
      )}
    </AuthContext.Provider>
  )
}
