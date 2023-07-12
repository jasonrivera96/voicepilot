import React, { useState, useRef } from 'react'
import { TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../constants'

const CustomRecorderButton = ({ stopRecording, startRecording }) => {
  const animation = useRef(new Animated.Value(0)).current
  const [isAnimating, setIsAnimating] = useState(false)

  const startAnimation = () => {
    if (isAnimating) {
      stopAnimation()
      stopRecording()
      return
    }
    setIsAnimating(true)
    startRecording()

    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: false
        })
      ])
    ).start()
  }

  const stopAnimation = () => {
    animation.stopAnimation()
    animation.setValue(0)
    setIsAnimating(false)
  }

  const buttonScale = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.2, 1]
  })

  const buttonOpacity = animation.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 0.5, 1]
  })

  return (
    <TouchableOpacity onPress={startAnimation}>
      <Animated.View
        style={[styles.button, { transform: [{ scale: buttonScale }], opacity: buttonOpacity }]}
      >
        <Ionicons name='md-mic' size={80} color='white' />
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: COLORS.ORANGE,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default CustomRecorderButton
