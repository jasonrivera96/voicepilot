import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { COLORS, personalInforScreenName, profileScreenName } from '../constants'
import PersonalInfoScreen from '../screen/PersonalInfoScreen'
import ProfileScreen from '../screen/ProfileScreen'

const ProfileStackNavigator = createStackNavigator()

const ProfileStack = () => {
  return (
    <ProfileStackNavigator.Navigator
      initialRouteName={profileScreenName}
      screenOptions={(router) => ({
        headerShown: false,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyle: { backgroundColor: 'transparent' },
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 200 } },
          close: { animation: 'timing', config: { duration: 200 } }
        }
      })}
    >
      <ProfileStackNavigator.Screen
        name={profileScreenName}
        component={ProfileScreen}
      />
      <ProfileStackNavigator.Screen
        name={personalInforScreenName}
        component={PersonalInfoScreen}
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Configuración',
          headerStyle: {
            backgroundColor: COLORS.WHITE,
            shadowColor: 'transparent'
          }
        }}
      />

    </ProfileStackNavigator.Navigator>
  )
}

export default ProfileStack
