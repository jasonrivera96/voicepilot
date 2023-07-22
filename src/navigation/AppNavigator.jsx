import { NavigationContainer } from '@react-navigation/native'
import React, { useContext } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

import AuthStack from './AuthStack'
import { AuthContext } from '../context/AuthContext'
import { COLORS } from '../constants'
import MainStack from './MainStack'

const AppNavigator = () => {
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

export default AppNavigator

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
