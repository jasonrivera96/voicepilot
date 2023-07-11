import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useContext, useState } from 'react'
import AuthStack from './AuthStack'
import { AuthContext } from '../context/AuthContext'
import LoginScreen from '../screen/LoginScreen'
import { ActivityIndicator, View, StyleSheet } from 'react-native'
import RegisterScreen from '../screen/RegisterScreen'

const MainStack = () => {
  const [registerUser, setRegisterUser] = useState(false)
  return (
    registerUser
      ? <RegisterScreen setRegisterUser={setRegisterUser} />
      : <LoginScreen setRegisterUser={setRegisterUser} />
  )
}

const AppNav = () => {
  const { isLoading, userToken } = useContext(AuthContext)

  if (isLoading) {
    return (
      <View style={styles.activityIndicatorContainer}>
        <ActivityIndicator size='large' />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <StatusBar style='dark' />
      {userToken !== null ? <AuthStack /> : <MainStack />}
    </NavigationContainer>
  )
}

export default AppNav

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
