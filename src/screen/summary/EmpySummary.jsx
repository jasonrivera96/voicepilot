import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'
import { COLORS, recorderScreenName, uploadScreenName } from '../../constants'
import { useNavigation } from '@react-navigation/native'

const folderIconEmpty = <Ionicons name='file-tray-full-outline' size={50} />

const EmptySummary = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View style={styles.iconEmpty}>{folderIconEmpty}</View>
      <Text style={styles.message}>No hay resúmenes</Text>
      <Text style={styles.description}>
        Los resúmenes se crean al
        <Text
          onPress={() => navigation.navigate(uploadScreenName)} style={styles.textLink}
        > subir un archivo
        </Text>
        <Text> o al hacer una</Text>
        <Text
          onPress={() => navigation.navigate(recorderScreenName)}
          style={styles.textLink}
        > grabación
        </Text>.
      </Text>
    </View>
  )
}

export default EmptySummary

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center'
  },
  iconEmpty: {
    backgroundColor: COLORS.GRAY,
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
    marginTop: 24,
    shadowColor: COLORS.ORANGE,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10
  },
  textButton: {
    color: COLORS.WHITE
  },
  textLink: {
    color: COLORS.ORANGE
  }
})
