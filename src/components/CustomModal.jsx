import { Modal, View, StyleSheet } from 'react-native'
import React from 'react'

export default function CustomModal ({ isVisible, children }) {
  return (
    <Modal animationType='slide' transparent visible={isVisible}>
      <View style={styles.modalContent}>
        {children}
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContent: {
    height: 225,
    width: '100%',
    backgroundColor: '#fff',
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: 'absolute',
    bottom: 0,
    padding: 24,
    elevation: 100
  }
})
