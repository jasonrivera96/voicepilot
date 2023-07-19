import React, { useContext, useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native'
import { Icon } from 'react-native-elements'
import Constants from 'expo-constants'
import * as DocumentPicker from 'expo-document-picker'

import { COLORS } from '../../constants'
import { StatusBar } from 'expo-status-bar'
import Mp3Template from './Mp3Template'
import Mp4Template from './Mp4Template'
import { uploadFile } from '../../services/UploadService'
import { AuthContext } from '../../context/AuthContext'

const UploadScreen = () => {
  const [file, setFile] = useState(null)
  const [mimeType, setMimeType] = useState()
  const { userData } = useContext(AuthContext)

  const handleFile = async () => {
    try {
      const { mimeType, name, size, uri, type } = await DocumentPicker.getDocumentAsync({
        type: ['audio/mp3', 'video/mp4']
      })

      if (type !== 'success') return
      setFile({ name, size, uri, type: mimeType })
      setMimeType(mimeType)
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    setFile(null)
    setMimeType()
  }

  const handleUpload = async () => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folderId', '64b402ff9901cc08cb8ae69c')
    const response = await uploadFile(userData, formData)
    if (response) {
      setFile(null)
      setMimeType()
      Alert.alert(
        'Archivo subido correctamente',
        'Se está procesando su solicitud, puede ver su estado en la sección de carpetas'
      )
      return
    }
    Alert.alert(
      'Error al subir el archivo',
      'Por favor intente nuevamente, si el error persiste comuníquese con soporte'
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />
      <Text style={styles.title}>Subir Archivo</Text>
      {!file && (
        <View style={styles.boxContainer}>
          <Icon name='cloud-upload' size={80} />
          <Text style={styles.titleLoad}>Carga tus archivos aquí</Text>
          <Text style={styles.fileName}>Formatos soportados MP3, MP4</Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText} onPress={handleFile}>Buscar archivos</Text>
          </TouchableOpacity>
        </View>
      )}
      {mimeType === 'audio/mp3' && (<Mp3Template file={file} />)}
      {mimeType === 'video/mp4' && (<Mp4Template file={file} />)}
      {file && (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.uploadButton1} onPress={handleCancel}>
            <Text style={styles.buttonText2}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton} onPress={handleUpload}>
            <Text style={styles.buttonText1}>Subir</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE
  },
  boxContainer: {
    width: 314,
    height: 267,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#BCC1CAFF',
    backgroundColor: COLORS.GRAY_LIGHT,
    borderRadius: 6,
    padding: 20,
    alignItems: 'center'
  },
  title: {
    marginTop: 80,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40
  },
  titleLoad: {
    fontSize: 20
  },
  button: {
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center'

  },
  buttonText: {
    fontSize: 16,
    color: COLORS.ORANGE

  },
  fileName: {
    fontSize: 16,
    marginBottom: 20,
    marginTop: '4%',
    color: COLORS.GRAY_EXTRA_SOFT
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10
  },
  uploadButton: {
    backgroundColor: COLORS.ORANGE,
    color: COLORS.WHITE,
    borderRadius: 5,
    marginTop: '15%',
    width: 82,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 22
  },
  buttonText1: {
    fontSize: 16,
    color: COLORS.WHITE

  },
  uploadButton1: {
    marginRight: 8,
    borderRadius: 5,
    marginTop: '15%',
    width: 82,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 22
  },
  buttonText2: {
    fontSize: 16,
    color: COLORS.GRAY_EXTRA_SOFT
  }

})

export default UploadScreen
