/* eslint-disable react/no-children-prop */
import React, { useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import { StyleSheet } from 'react-native'
import HomeStack from './HomeStack'
import NotificationScreen from '../screen/NotificationScreen'
import { useNavigation } from '@react-navigation/native'

import SearchScreen from '../screen/SearchScreen'
import RecorderScreen from '../screen/RecorderScreen'
import UploadScreen from '../screen/upload/UploadScreen'

import {
  COLORS,
  homeStackName,
  profileStackName,
  recorderScreenName,
  searchScreenName,
  summaryScreenName,
  uploadScreenName
} from '../constants'
import { FolderProvider } from '../context/FolderContext'
import ProfileStack from './ProfileStack'

const Tab = createBottomTabNavigator()

const getIcon = (routeName, focused) => {
  switch (routeName) {
    case homeStackName:
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
    case profileStackName:
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
        initialRouteName={homeStackName}
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: COLORS.GRAY_SOFT,
          tabBarStyle: styles.tabBarStyle,
          tabBarIcon: ({ focused, color, size }) =>
            renderTabBarIcon({ route, focused, color, size })
        })}
      >
        <Tab.Screen name={homeStackName} component={HomeStack} />
        <Tab.Screen name={searchScreenName} component={SearchScreen} />
        <Tab.Screen
          name={recorderScreenName}
          children={() => <RecorderScreen toggleShowNotification={toggleShowNotification} />}
        />
        <Tab.Screen
          name={uploadScreenName}
          children={() => <UploadScreen toggleShowNotification={toggleShowNotification} />}
        />
        <Tab.Screen name={profileStackName} component={ProfileStack} />

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
    bottom: 0,
    elevation: 0
  }
})
