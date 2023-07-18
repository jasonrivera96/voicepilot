import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../../constants';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants'



const Mp4Screen = () => {
  const [file, setFile] = useState(null);

  const handleUpload = () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      // API PARA SUBIR ARCHIVOS
      // const response = await.axios.post('', formData);
      Alert.alert('Éxito', 'Archivo subido correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo subir el archivo');


    }
    console.log('Archivo:', file);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Subir Archivo</Text>
      <View style={styles.boxContainer}>
      <Ionicons name="videocam-outline" size={80} style={{ textAlign: 'center' }}/>

        {/* CARGAR EL NOMBRE DEL ARCHIVO */}
        <Text style={styles.fileName}>Audio Name</Text>
        <Text style={styles.dur}>Duración:</Text>
        {/* AGREGAR COMPONENTE CON LA DURACION */}


        <Text style={styles.buttonText}>MP4</Text>



      </View>
      <View style={{flexDirection: 'row'}}>
      <TouchableOpacity style={styles.uploadButton1} onPress={handleUpload}>
        <Text style={styles.buttonText2}>Cancelar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
        <Text style={styles.buttonText1}>Subir</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
  },
  boxContainer: {
    width: 314,
    height: 267,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: "#BCC1CAFF",
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 6,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  button: {
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'

  },
  buttonText: {
    fontSize: 16,
    color: COLORS.ORANGE,
    textAlign: 'center',
    marginTop: "9%"

  },
  fileName: {
    fontSize: 20,
    marginBottom: 20,
    marginTop: "4%",
    textAlign: 'center'
  },
  dur: {
    textAlign: 'center',
    color: COLORS.GRAY_SOFT,
    fontSize: 16
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  uploadButton: {
    backgroundColor: COLORS.ORANGE,
    color: COLORS.WHITE,
    borderRadius: 5,
    marginTop: "15%",
    width: 82,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 22,
  },
  buttonText1: {
    fontSize: 16,
    color: COLORS.WHITE,

  },
  
  uploadButton1: {
    marginRight:8,
    borderRadius: 5,
    marginTop: "15%",
    width: 82,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 22,
  },
  buttonText2: {
    fontSize: 16,
    color: COLORS.GRAY_EXTRA_SOFT,

  },
  
});


export default Mp4Screen;
