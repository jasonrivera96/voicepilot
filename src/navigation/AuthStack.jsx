/* eslint-disable react/no-children-prop */
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native'

import ProfileScreen from '../screen/ProfileScreen'
import SearchScreen from '../screen/SearchScreen'
import RecorderScreen from '../screen/RecorderScreen'
import UploadScreen from '../screen/upload/UploadScreen'

import {
  COLORS,
  homeScreenName,
  profileScreenName,
  recorderScreenName,
  searchScreenName,
  summaryScreenName,
  uploadScreenName
} from '../constants'
import HomeStack from './HomeStack'
import NotificationScreen from '../screen/NotificationScreen'
import { useNavigation } from '@react-navigation/native'

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
      type='ionicon'
      size={isRecorderScreen ? 35 : size}
      color={isRecorderScreen ? '#FFFFFF' : color}
      containerStyle={isRecorderScreen && styles.recorderIcon}
    />
  )
}

const AuthStack = () => {
  const [showNotification, setShowNotification] = useState(false)
  const [folder, setFolder] = useState()
  const navigation = useNavigation()

  const handleNotificationClose = () => {
    setShowNotification(false)
  }

  const handleNavigationOnClose = () => {
    setShowNotification(false)
    navigation.navigate(summaryScreenName, { folderId: folder?.id, folderName: folder?.name })
  }

  const toggleShowNotification = ({ folder }) => {
    setShowNotification(true)
    setFolder(folder)
  }

  return (
    <>
      <Tab.Navigator
        initialRouteName={homeScreenName}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: COLORS.GRAY_SOFT,
          tabBarStyle: styles.tabBarStyle,
          tabBarIcon: ({ focused, color, size }) =>
            renderTabBarIcon({ route, focused, color, size })
        })}
      >
        <Tab.Screen name={homeScreenName} component={HomeStack} />
        <Tab.Screen name={searchScreenName} component={SearchScreen} />
        <Tab.Screen
          name={recorderScreenName}
          children={() => <RecorderScreen toggleShowNotification={toggleShowNotification} />}
        />
        <Tab.Screen
          name={uploadScreenName}
          children={() => <UploadScreen toggleShowNotification={toggleShowNotification} />}
        />
        <Tab.Screen name={profileScreenName} component={ProfileScreen} />

      </Tab.Navigator>
      {
        showNotification && (
          <NotificationScreen
            onClose={handleNotificationClose}
            navigationOnClose={handleNavigationOnClose}
          />
        )
      }
    </>
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
