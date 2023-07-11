import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import React, { useContext } from 'react'
import AuthStack from './AuthStack'
import { AuthContext } from '../context/AuthContext'
import LoginScreen from '../screen/LoginScreen'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

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
      {userToken !== null ? <AuthStack /> : <LoginScreen />}
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
