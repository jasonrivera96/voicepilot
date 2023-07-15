import React, {useState} from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import axios from 'axios';
import { COLORS } from '../../constants';
import { Icon } from 'react-native-elements';



const UploadScreen = () => {
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
      <Icon name='cloud-upload' size={80} ></Icon>
      <Text style={styles.fileName}>Formatos soportados MP3, MP4</Text>
      {/* DAR FUNCIONALIDAD PARA SUBIR ARCHIVOS (API) */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={handleUpload}>Seleccionar Archivo</Text>
      </TouchableOpacity>
      <Text style={styles.fileName}>{file ? file.name : 'Ningún archivo seleccionado'}</Text>
           
      </View>
      {/* DIRIGIR A LA PANTALLA SEGUN MP3SCREEN O MP4SCREEN EL TIPO DE ARCHIVO */}
      <TouchableOpacity style={styles.uploadButton} >

        <Text style={styles.buttonText1}>Subir</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.WHITE
  },
  boxContainer: {
    width:314,
    height: 267,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: "#BCC1CAFF",
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 6,
    padding: 20,
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
  
  },
  fileName: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: "4%"
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
});


export default UploadScreen
