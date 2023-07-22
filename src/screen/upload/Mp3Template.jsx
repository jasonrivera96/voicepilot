import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { COLORS } from '../../constants'
import { MaterialCommunityIcons } from '@expo/vector-icons'

const Mp3Template = ({ file }) => {
  const { name, size, type } = file

  const sizeBytesToMb = (size) => {
    const sizeMb = size / 1000000
    return sizeMb.toFixed(2) + ' MB'
  }

  return (
    <View>
      <View style={styles.boxContainer}>
        <MaterialCommunityIcons name='music-note-outline' size={80} style={{ textAlign: 'center' }} />
        <Text style={styles.fileName}>{name}</Text>
        <Text style={styles.duration}>Tamaño: {sizeBytesToMb(size)}</Text>
        <Text style={styles.buttonText}>{type.replace('audio/', '')}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  boxContainer: {
    width: 314,
    height: 267,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#BCC1CAFF',
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 6,
    padding: 20
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.ORANGE,
    textAlign: 'center',
    marginTop: '9%',
    textTransform: 'uppercase'

  },
  fileName: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: '4%',
    textAlign: 'center'
  },
  duration: {
    textAlign: 'center',
    color: COLORS.GRAY_SOFT,
    fontSize: 16
  }
})

export default Mp3Template
