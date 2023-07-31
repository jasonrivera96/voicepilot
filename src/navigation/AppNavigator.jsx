import { NavigationContainer } from '@react-navigation/native'
import React, { useContext } from 'react'
import { ActivityIndicator, View, StyleSheet } from 'react-native'

import AuthStack from './AuthStack'
import { AuthContext } from '../context/AuthContext'
import { COLORS } from '../constants'
import MainStack from './MainStack'
import CustomAlert from '../components/CustomAlert'
import { useNotificationContext } from '../context/NotificationContext'

const AppNavigator = () => {
  const { isLoading, userToken } = useContext(AuthContext)
  const { data, setData } = useNotificationContext()

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
      {data && (
        <CustomAlert
          data={data}
          onClose={() => setData('')}
        />
      )}
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
