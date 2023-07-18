import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, homeScreenName, recorderScreenName } from '../constants';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'


const NotificationScreen = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/loading.gif')}
        style={styles.loadingGif}
      />
      <Text style={styles.processingText}>Procesando...</Text>
      <Text style={styles.messageText}>Estamos realizando tu resumen. Esto podría tardar unos minutos</Text>
      {/* REGRESAR A LA VENTANA RECORDER */}
      <TouchableOpacity
        style={[styles.buttonModal, { backgroundColor: COLORS.WHITE }]}
        onPress={()=>navigation.navigate(recorderScreenName)}
      >
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.summariesButton} onPress={()=>navigation.navigate(homeScreenName)}>
        <Text style={styles.summariesButtonText} >Summaries</Text>
        <Feather name="arrow-right" size={20} color={COLORS.ORANGE} />
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
    marginTop: "20%",
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
    marginTop: "15%"
  },
  summariesButton: {
    position: 'absolute',
    bottom: "10%",  
    right: "2%",
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  
  summariesButtonText: {
    color: COLORS.ORANGE,
    fontSize: 16,
    marginRight: 8,
  },
});

export default NotificationScreen;
