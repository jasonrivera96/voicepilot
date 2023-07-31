import React, { useRef, useEffect, useCallback } from 'react'
import { Text, Animated, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS } from '../constants'
import Constants from 'expo-constants'
import { Icon } from 'react-native-elements'

const CustomAlert = ({ data, onClose }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current

  const closeAlert = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true
    }).start(() => {
      onClose()
    })
  }, [fadeAnim, onClose])

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start()

    const timer = setTimeout(() => {
      closeAlert()
    }, 2000)

    return () => clearTimeout(timer)
  }, [fadeAnim, closeAlert])

  const alert = {
    icon: '',
    backgroundColor: '',
    textColor: ''
  }

  const { message, level } = data

  if (level === 'info' || level === undefined) {
    alert.icon = 'information-circle-outline'
    alert.backgroundColor = COLORS.ORANGE_EXTRA_SOFT
    alert.textColor = COLORS.ORANGE
  } else if (level === 'success') {
    alert.icon = 'checkmark-circle-outline'
    alert.backgroundColor = COLORS.GREEN_SOFT
    alert.textColor = COLORS.GREEN
  } else if (level === 'error') {
    alert.icon = 'close-circle-outline'
    alert.backgroundColor = COLORS.DANGER_EXTRA_SOFT
    alert.textColor = COLORS.DANGER
  }

  const containerStyle = {
    opacity: fadeAnim,
    transform: [{ scale: fadeAnim }],
    backgroundColor: alert.backgroundColor
  }

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <TouchableOpacity onPress={closeAlert} style={styles.content}>
        <Icon type='ionicon' name={alert.icon} size={20} color={alert.textColor} />
        <Text style={[styles.messageText, { color: alert.textColor }]}>{message}</Text>
      </TouchableOpacity>
    </Animated.View>
  )
}

export default CustomAlert

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Constants.statusBarHeight + 20,
    alignSelf: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 50
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  messageText: {
    fontSize: 13
  }
})
