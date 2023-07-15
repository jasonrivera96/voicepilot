import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';

const NotificationScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/loading.gif')}
        style={styles.loadingGif}
      />
      <Text style={styles.processingText}>Procesando...</Text>
      <Text style={styles.messageText}>Estamos realizando tu resumen. Esto podría tomar unos minutos</Text>
      <TouchableOpacity
        style={[styles.buttonModal, { backgroundColor: COLORS.WHITE }]}
      >
        {/* DIRECCIONAR A LA PANTALLA DE SUMMARY */}
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingGif: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  buttonModal: {
    marginTop: "30%",
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.ORANGE,

  },
  buttonText: {
    width: 82,
    height: 36,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: COLORS.ORANGE,
    fontSize: 14,
    lineHeight: 22,
  },
  processingText: {
    fontSize: 32,
    lineHeight: 48,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.ORANGE
  },
  messageText: {
    fontSize: 18,
    lineHeight: 28,
    textAlign: 'center',
    paddingHorizontal: 40,
    color: COLORS.ORANGE,
    marginTop: "20%"
  },
});

export default NotificationScreen;
