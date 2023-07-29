import { Modal, View, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import React, { useEffect } from 'react'
import { COLORS } from '../constants'
import { StatusBar } from 'expo-status-bar'

export default function CustomModal ({ isVisible, children }) {
  useEffect(() => {
    return () => {
      <StatusBar style='dark' backgroundColor='white' />
    }
  }, [])

  return (
    <View style={styles.container}>
      {isVisible
        ? <StatusBar style='dark' backgroundColor='#1110108d' />
        : <StatusBar style='dark' backgroundColor='white' />}
      <Modal animationType='slide' transparent visible={isVisible}>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {children}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.307)'
  },
  modalContent: {
    backgroundColor: COLORS.WHITE,
    padding: 20,
    borderTopEndRadius: 15,
    borderTopStartRadius: 16

  }
})
