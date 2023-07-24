import React, { useState, useRef } from 'react'
import { TouchableOpacity, Animated, Easing, StyleSheet } from 'react-native'
import { COLORS } from '../constants'
import { Icon } from 'react-native-elements'

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
        style={[styles.button,
          { transform: [{ scale: buttonScale }], opacity: buttonOpacity },
          { backgroundColor: isAnimating ? COLORS.ORANGE : COLORS.WHITE }]}
      >
        <Icon
          type='font-awesome-5'
          name='microphone'
          size={150}
          color={isAnimating ? COLORS.WHITE : COLORS.ORANGE}
        />
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    width: 250,
    height: 250,
    borderRadius: 200,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default CustomRecorderButton
