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
import { Octicons } from '@expo/vector-icons'

const Tab = createBottomTabNavigator()

const getIconName = (routeName, focused) => {
  switch (routeName) {
    case homeScreenName:
      return 'home'
    case searchScreenName:
      return 'search'
    case recorderScreenName:
      return 'mic'
    case uploadScreenName:
      return 'upload'
    case profileScreenName:
      return 'person'
    default:
      return ''
  }
}

const renderTabBarIcon = ({ route, focused, color, size }) => {
  const iconName = getIconName(route.name, focused)
  const isRecorderScreen = route.name === recorderScreenName

  if (isRecorderScreen) {
    return (
      <Icon
        name={iconName}
        type='ionicon'
        size={35}
        color='#FFFFFF'
        containerStyle={styles.recorderIcon}
      />
    )
  }

  return (
    <Octicons
      name={iconName}
      size={size}
      color={color}
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
    elevation: 0,
    backgroundColor: COLORS.WHITE
  }
})
