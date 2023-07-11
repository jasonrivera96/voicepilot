import React, { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'
import { AuthProvider } from './src/context/AuthContext'
import AppNav from './src/navigation/AppNav'

export default function App () {
  useEffect(() => {
    const changeStatusBarColor = async () => {
      NavigationBar.setBackgroundColorAsync('#FFFFFF')
      NavigationBar.setButtonStyleAsync('dark')
    }
    changeStatusBarColor()
  }, [])

  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  )
}
