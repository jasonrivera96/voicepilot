import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { COLORS } from '../../constants'
import { Ionicons } from '@expo/vector-icons'

const Mp4Template = ({ file }) => {
  const { name, size } = file

  const sizeBytesToMb = (size) => {
    const sizeMb = size / 1000000
    return sizeMb.toFixed(2) + ' MB'
  }

  return (
    <View>
      <View style={styles.boxContainer}>
        <Ionicons name='videocam-outline' size={80} style={{ textAlign: 'center' }} />
        <Text style={styles.fileName}>{name}</Text>
        <Text style={styles.duracion}>Tamaño: {sizeBytesToMb(size)}</Text>
        <Text style={styles.buttonText}>MP4</Text>
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
    padding: 20,
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.ORANGE,
    textAlign: 'center',
    marginTop: '9%'

  },
  fileName: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: '4%',
    textAlign: 'center'
  },
  duracion: {
    textAlign: 'center',
    color: COLORS.GRAY_SOFT,
    fontSize: 16
  }
})

export default Mp4Template
