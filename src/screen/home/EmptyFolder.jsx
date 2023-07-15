import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'
import { COLORS } from '../../constants'

const folderIconEmpty = <Ionicons name='folder-open-outline' size={50} />
const addIcon = <Ionicons name='add' size={30} color='white' />

const EmptyFolder = ({ openModal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconEmpty}>{folderIconEmpty}</View>
      <Text style={styles.message}>No hay carpetas</Text>
      <Text style={styles.description}>
        Las carpetas te ayudan a organizar tus resúmenes, crea una carpeta para cada proyecto.
      </Text>
      <TouchableOpacity onPress={openModal} style={styles.containerButton}>
        {addIcon}
        <Text style={styles.textButton}>Crear carpeta</Text>
      </TouchableOpacity>
    </View>
  )
}

export default EmptyFolder

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center'
  },
  iconEmpty: {
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: 128,
    height: 128,
    borderRadius: 64
  },
  message: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30
  },
  description: {
    fontSize: 14,
    marginHorizontal: 40,
    textAlign: 'center',
    marginTop: 10,
    color: COLORS.GRAY_EXTRA_SOFT
  },
  containerButton: {
    backgroundColor: COLORS.ORANGE,
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: 152,
    height: 44,
    borderRadius: 8,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24
  },
  textButton: {
    color: COLORS.WHITE
  }
})
