import React, { useEffect } from 'react'
import * as NavigationBar from 'expo-navigation-bar'

import { AuthProvider } from './src/context/AuthContext'
import AppNav from './src/navigation/AppNav'
import { StatusBar } from 'expo-status-bar'

export default function App () {
  // useEffect(() => {
  //   const changeStatusBarColor = async () => {
  //     NavigationBar.setBackgroundColorAsync('#FFFFFF')
  //     NavigationBar.setButtonStyleAsync('dark')
  //   }
  //   changeStatusBarColor()
  // }, [])

  return (
    <AuthProvider>
      <StatusBar style='dark' backgroundColor='white' />
      <AppNav />
    </AuthProvider>
  )
}
