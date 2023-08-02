import React, { useEffect } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { COLORS } from '../constants'
import { MaterialIcons, Feather } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import * as NavigationBar from 'expo-navigation-bar'

const NotificationScreen = ({ onClose, navigationOnClose }) => {
  useEffect(() => {
    const changeStatusBarColor = async ({ backgroundColor, buttonStyle }) => {
      NavigationBar.setBackgroundColorAsync(backgroundColor)
      NavigationBar.setButtonStyleAsync(buttonStyle)
    }
    changeStatusBarColor({ backgroundColor: COLORS.ORANGE, buttonStyle: 'light' })
    return () => {
      changeStatusBarColor({ backgroundColor: COLORS.WHITE, buttonStyle: 'dark' })
    }
  }, [])

  return (
    <View style={styles.notificationContainer}>
      <StatusBar style='light' backgroundColor={COLORS.ORANGE} />
      <Feather name='check-circle' size={170} color={COLORS.WHITE} />
      <Text style={styles.processingText}>Archivo recibido</Text>
      <Text style={styles.messageText}>Estamos realizando tu resumen, esto podría tardar unos minutos.</Text>
      <TouchableOpacity
        style={[styles.buttonModal, { backgroundColor: COLORS.WHITE }]}
        onPress={() => onClose()}
      >
        <Text style={styles.buttonText}>Entendido</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.summariesButton}
        onPress={() => navigationOnClose()}
      >
        <Text style={styles.summariesButtonText}>Mis resúmenes</Text>
        <MaterialIcons
          name='arrow-forward-ios' size={14} color='black' style={{ marginHorizontal: 5, color: COLORS.WHITE }}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  notificationContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.ORANGE,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingGif: {
    width: 120,
    height: 120,
    marginBottom: 20
  },
  buttonModal: {
    marginTop: '20%',
    borderRadius: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.ORANGE
  },
  buttonText: {
    paddingVertical: 8,
    paddingHorizontal: 30,
    fontSize: 16,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.ORANGE
  },
  processingText: {
    fontSize: 32,
    // lineHeight: 48,
    fontWeight: 'bold',
    color: COLORS.WHITE,
    marginTop: 30
  },
  messageText: {
    // lineHeight: 28,
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 40,
    color: COLORS.WHITE,
    marginTop: 10
  },
  summariesButton: {
    position: 'absolute',
    bottom: '5%',
    right: '10%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  summariesButtonText: {
    color: COLORS.WHITE,
    fontSize: 16
  }
})

export default NotificationScreen
