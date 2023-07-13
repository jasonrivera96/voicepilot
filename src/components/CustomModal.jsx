import { Modal, View, StyleSheet, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, Platform } from 'react-native'
import React from 'react'
import Constants from 'expo-constants'
import { COLORS } from '../constants'

export default function CustomModal ({ isVisible, children }) {
  return (

    <View style={styles.container}>
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
    paddingTop: Constants.statusBarHeight,
    backgroundColor: COLORS.WHITE
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.307)'
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopEndRadius: 15,
    borderTopStartRadius: 16

  }
})
