import { NavigationContainer } from '@react-navigation/native'
import React, { useContext, useState } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

import AuthStack from './AuthStack'
import { AuthContext } from '../context/AuthContext'
import LoginScreen from '../screen/LoginScreen'
import RegisterScreen from '../screen/RegisterScreen'
import { COLORS } from '../constants'

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
        <ActivityIndicator size='large' color={COLORS.ORANGE} />
      </View>
    )
  }

  return (
    <NavigationContainer>
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
