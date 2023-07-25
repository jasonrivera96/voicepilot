/* eslint-disable react/no-children-prop */
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import HomeStack from './HomeStack'
import NotificationScreen from '../screen/NotificationScreen'
import { useNavigation } from '@react-navigation/native'

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
import { FolderProvider } from '../context/FolderContext'

const Tab = createBottomTabNavigator()

const getIcon = (routeName, focused) => {
  switch (routeName) {
    case homeScreenName:
      return {
        name: 'home',
        type: 'octicon'
      }
    case searchScreenName:
      return {
        name: 'search',
        type: 'octicon'
      }
    case recorderScreenName:
      return {
        name: 'microphone',
        type: 'font-awesome-5'
      }
    case uploadScreenName:
      return {
        name: 'upload-cloud',
        type: 'feather'
      }
    case profileScreenName:
      return {
        name: 'person',
        type: 'octicon'
      }
    default:
      return ''
  }
}

const renderTabBarIcon = ({ route, focused, color, size }) => {
  const { name, type } = getIcon(route.name, focused)
  const isRecorderScreen = route.name === recorderScreenName

  if (isRecorderScreen) {
    return (
      <Icon
        name={name}
        type={type}
        size={size}
        color={focused ? color : COLORS.WHITE}
        containerStyle={!focused && styles.recorderIcon}
      />
    )
  }

  return (
    <Icon
      name={name}
      type={type}
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
    <FolderProvider>
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
    </FolderProvider>
  )
}

export default AuthStack

const styles = StyleSheet.create({
  recorderIcon: {
    borderRadius: 50,
    backgroundColor: COLORS.ORANGE,
    padding: 10,
    textAlign: 'center',
    width: 48
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
