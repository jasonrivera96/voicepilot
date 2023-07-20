import React, { useContext, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput
} from 'react-native'
import { Icon } from 'react-native-elements'
import Constants from 'expo-constants'
import * as DocumentPicker from 'expo-document-picker'

import { COLORS } from '../../constants'
import { StatusBar } from 'expo-status-bar'
import Mp3Template from './Mp3Template'
import Mp4Template from './Mp4Template'
import { uploadFile } from '../../services/UploadService'
import { AuthContext } from '../../context/AuthContext'
import Dropdown from 'react-native-select-dropdown'
import { loadFolders } from '../../services/FolderService'

const UploadScreen = () => {
  const [file, setFile] = useState(null)
  const [mimeType, setMimeType] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [description, setDescription] = useState('')
  const [dropdownItems, setDropdownItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  const { userData } = useContext(AuthContext)

  useEffect(() => {
    async function fetchFolders () {
      try {
        const response = await loadFolders(userData)
        const folders = response.map((folder) => ({ name: folder.name, id: folder.id }))
        setDropdownItems(folders)
      } catch (error) {
        console.error('Error al obtener las carpetas:', error.message)
      }
    }
    fetchFolders()
  }, [file, userData])

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
    formData.append('folderId', selectedItem)
    const response = await uploadFile(userData, formData)
    if (response) {
      setFile(null)
      setMimeType()
      setDescription('')
      setSelectedItem(null)
      Alert.alert(
        'Archivo subido correctamente',
        'Se está procesando su solicitud, puede ver su estado en la sección de carpetas'
      )
      setIsModalVisible(false)
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
      {mimeType === 'audio/mp3' && file && (<Mp3Template file={file} />)}
      {mimeType === 'video/mp4' && file && (<Mp4Template file={file} />)}
      {file && (
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.uploadButton1} onPress={handleCancel}>
            <Text style={styles.buttonText2}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.uploadButton} onPress={() => setIsModalVisible(true)}>
            <Text style={styles.buttonText1}>Subir</Text>
          </TouchableOpacity>
        </View>
      )}
      <Modal visible={isModalVisible} animationType='slide' transparent>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Subir archivo</Text>

                <Text style={styles.label}>Nombre del audio</Text>
                <TextInput
                  style={styles.inputName}
                  value={file?.name}
                  editable={false}
                  multiline
                />

                <Text style={styles.label}>Seleccione la carpeta</Text>
                <Dropdown
                  data={dropdownItems}
                  rowTextStyle={{ fontSize: 14 }}
                  dropdownStyle={{ width: '90%', height: '20%', borderRadius: 15 }}
                  selectedRowTextStyle={{ color: COLORS.ORANGE }}
                  rowStyle={{ height: 30, borderBottomWidth: 0 }}
                  buttonStyle={{ width: '100%', height: 40, borderRadius: 10, marginBottom: 10, paddingHorizontal: 5, backgroundColor: COLORS.GRAY }}
                  buttonTextStyle={{ fontSize: 14 }}
                  renderDropdownIcon={() => <Icon name='chevron-down' style={{ marginRight: 10 }} type='font-awesome-5' color={COLORS.GRAY_SOFT} size={16} />}
                  onSelect={(item) => setSelectedItem(item.id)}
                  defaultButtonText='Seleccione una carpeta'
                  rowTextForSelection={(item) => item.name}
                  buttonTextAfterSelection={(selectedItem) => selectedItem.name}
                />

                <Text style={styles.label}>Descripción</Text>
                <TextInput
                  style={styles.inputDescription}
                  value={description}
                  onChangeText={setDescription}
                  multiline
                />
                <View style={styles.transcribir}>
                  <TouchableOpacity
                    style={[styles.buttonModal, { backgroundColor: '#F3F4F6FF' }]}
                    onPress={() => setIsModalVisible(false)}
                    color='#353536'
                  >
                    <Text style={styles.buttonTextModal}>Cancelar</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.buttonModal, { backgroundColor: '#FF7700FF' }]}
                    onPress={handleUpload}
                  >
                    <Text style={styles.buttonText1}>Transcribir</Text>
                  </TouchableOpacity>
                </View>
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
    borderTopStartRadius: 16,
    elevation: 5
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
    marginTop: 15
  },
  dropdownStyle: {
    width: '90%',
    height: '15%',
    borderRadius: 10
  },
  inputName: {
    minHeight: 40,
    maxHeight: 120,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
    backgroundColor: COLORS.GRAY
  },
  inputDescription: {
    minHeight: 80,
    maxHeight: 120,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
    backgroundColor: COLORS.GRAY
  },
  transcribir: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  buttonTextModal: {
    color: '#353536',
    fontSize: 14
  },
  buttonModal: {
    borderRadius: 12,
    padding: 10,
    marginRight: 20,
    width: 150,
    alignItems: 'center'
  }
})

export default UploadScreen
