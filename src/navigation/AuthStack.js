import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements';
import { StyleSheet } from 'react-native'

import HomeScreen from '../screen/HomeScreen'
import ProfileScreen from '../screen/ProfileScreen'
import SearchScreen from '../screen/SearchScreen'
import RecorderScreen from '../screen/RecorderScreen'
import UploadScreen from '../screen/UploadScreen'

import {
  COLORS,
  homeScreenName,
  profileScreenName,
  recorderScreenName,
  searchScreenName,
  uploadScreenName
} from '../constants'

const Tab = createBottomTabNavigator()

const getIconName = (routeName, focused) => {
  switch (routeName) {
    case homeScreenName:
      return focused ? 'home' : 'home-outline'
    case searchScreenName:
      return focused ? 'search' : 'search-outline'
    case recorderScreenName:
      return 'mic'
    case uploadScreenName:
      return focused ? 'cloud-upload' : 'cloud-upload-outline'
    case profileScreenName:
      return focused ? 'person' : 'person-outline'
    default:
      return ''
  }
}

const renderTabBarIcon = ({ route, focused, color, size }) => {
  const iconName = getIconName(route.name, focused)
  const isRecorderScreen = route.name === recorderScreenName

  return (
    <Icon
      name={iconName}
      type="ionicon"
      size={isRecorderScreen ? 35 : size}
      color={isRecorderScreen ? '#FFFFFF' : color}
      containerStyle={isRecorderScreen && styles.recorderIcon}
    />
  )
}

const AuthStack = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeScreenName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#323842FF',
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color, size }) =>
          renderTabBarIcon({ route, focused, color, size })
      })}

    >
      <Tab.Screen name={homeScreenName} component={HomeScreen} />
      <Tab.Screen name={searchScreenName} component={SearchScreen} />
      <Tab.Screen name={recorderScreenName} component={RecorderScreen} />
      <Tab.Screen name={uploadScreenName} component={UploadScreen} />
      <Tab.Screen name={profileScreenName} component={ProfileScreen} />

    </Tab.Navigator>
  )
}

export default AuthStack

const styles = StyleSheet.create({
  recorderIcon: {
    borderRadius: 50,
    backgroundColor: COLORS.ORANGE,
    padding: 10,
    textAlign: 'center',
    width: 58
  },
  tabBarStyle: {
    height: 85,
    borderTopWidth: 0,
    position: 'absolute',
    bottom: 0,
    elevation: 0
  }
})
