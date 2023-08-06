import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import { COLORS } from '../constants'

const CustomButton = ({ color, filled, style, title, ...restProps }) => {
  const filledBgColor = color || COLORS.ORANGE
  const bgColor = filled ? filledBgColor : COLORS.WHITE
  const textColor = filled ? COLORS.WHITE : COLORS.GRAY_SOFT

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...style
      }}
      {...restProps}
    >
      <Text style={{ color: textColor }}>{title}</Text>
    </TouchableOpacity>
  )
}

CustomButton.defaultProps = {
  filled: true,
  disabled: false
}

const styles = StyleSheet.create({
  button: {
    marginTop: 20,
    width: '100%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.ORANGE,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10
  }
})

export default CustomButton
