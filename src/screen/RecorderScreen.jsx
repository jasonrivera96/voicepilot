import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator
  , Alert
} from 'react-native'
import { Audio } from 'expo-av'
import Dropdown from 'react-native-select-dropdown'
import Constants from 'expo-constants'
import { loadFolders } from '../services/FolderService'

import CustomRecorderButton from '../components/CustomRecorderButton'
import { COLORS } from '../constants'
import { StatusBar } from 'expo-status-bar'
import * as FileSystem from 'expo-file-system'

import { AuthContext } from '../context/AuthContext'
import { Icon } from 'react-native-elements'
import { uploadFile } from '../services/UploadService'

export default function RecorderScreen ({ toggleShowNotification }) {
  const [recording, setRecording] = useState()

  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)

  const [customInterval, setCustomInterval] = useState()
  const [recordingName, setRecordingName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [dropdownItems, setDropdownItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [isLoading, setisLoading] = useState(false)

  const { userData } = useContext(AuthContext)

  const fetchData = useCallback(async () => {
    try {
      const response = await loadFolders(userData)

      const folderNames = response.map((folder) => ({ name: folder.name, id: folder.id }))
      setDropdownItems(folderNames)
    } catch (error) {
      console.error('Error al obtener las carpetas:', error.message)
    }
  }, [userData])

  useEffect(() => {
    return () => {
      if (customInterval) {
        clearInterval(customInterval)
      }
    }
  }, [customInterval])

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync()
      if (permission.status === 'granted') {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        })

        const { recording } = await Audio.Recording.createAsync(
          Audio.RecordingOptionsPresets.HIGH_QUALITY
        )

        setRecording(recording)
        setCustomInterval(
          setInterval(() => {
            setSeconds((prevSeconds) => {
              if (prevSeconds + 1 === 60) {
                setMinutes((prevMinutes) => {
                  if (prevMinutes + 1 === 60) {
                    setHours((prevHours) => prevHours + 1)
                    return 0
                  }
                  return prevMinutes + 1
                })
                return 0
              }
              return prevSeconds + 1
            })
          }, 1000)
        )
      }
    } catch (error) {
      console.error('Failed to start recording', error)
    }
  }

  const stopRecording = async () => {
    if (recording) {
      setRecording(undefined)
      await recording.stopAndUnloadAsync()
      await Audio.setAudioModeAsync(
        {
          allowsRecordingIOS: false
        }
      )
      setRecording(recording.getURI())
      handleSendRecordings()
      clearInterval(customInterval)
    }
  }

  const handleSendRecordings = () => {
    fetchData()
    setModalVisible(true)
  }

  const handleUpload = async () => {
    if (!selectedItem) {
      return
    }

    const audioFileName = `${recordingName}.m4a`
    const basePath = recording.split('/').slice(0, -1).join('/')
    const pathAudioFileWithName = `${basePath}/${audioFileName}`

    try {
      FileSystem.moveAsync({
        from: recording,
        to: pathAudioFileWithName
      })
    } catch (error) {
      console.log('Error al cambiar el nombre del archivo', error)
    }

    const file = {
      name: audioFileName,
      uri: pathAudioFileWithName,
      type: 'audio/m4a'
    }

    Keyboard.dismiss()

    const formData = new FormData()
    formData.append('file', file)
    formData.append('folderId', selectedItem.id)
    setisLoading(true)
    const response = await uploadFile(userData, formData)
    if (response) {
      toggleShowNotification({ folder: selectedItem })
      setRecordingName('')
      setRecording(null)
      setSelectedItem(null)
      setModalVisible(false)
      setSeconds(0)
      setMinutes(0)
      setHours(0)
      setisLoading(false)
      return
    }
    Alert.alert(
      'Error al subir el archivo',
      'Por favor intente nuevamente, si el error persiste comuníquese con soporte'
    )
    setisLoading(false)
  }

  const closeModal = () => {
    Alert.alert(
      '¿Estás seguro?',
      'Si cancelas, perderás la grabación',
      [
        {
          text: 'Sí',
          onPress: () => {
            setModalVisible(false)
            setSelectedItem(null)
            setSeconds(0)
            setMinutes(0)
            setHours(0)
          },
          style: 'cancel'
        },
        { text: 'No' }
      ],
      { cancelable: false }
    )
  }

  return (

    <View style={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />
      <Text style={styles.timer}>{`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</Text>

      <View style={styles.containerSpace} />

      <CustomRecorderButton stopRecording={stopRecording} startRecording={startRecording} />

      <Modal visible={modalVisible} animationType='slide' transparent>
        <KeyboardAvoidingView
          style={styles.modalContainer}
          behavior={Platform.OS === 'ios' ? 'padding' : null}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Guardar Grabación</Text>

                <Text style={styles.label}>Nombre del audio</Text>
                <TextInput
                  style={styles.inputName}
                  value={recordingName}
                  onChangeText={setRecordingName}
                  multiline
                />
                <View>
                  {!recordingName && <Text style={{ color: COLORS.DANGER, fontSize: 12 }}>* Este campo es requerido</Text>}
                </View>

                <Text style={styles.label}>Carpeta</Text>
                <Dropdown
                  data={dropdownItems}
                  rowTextStyle={{ fontSize: 14 }}
                  dropdownStyle={{ width: '90%', height: '20%', borderRadius: 15 }}
                  selectedRowTextStyle={{ color: COLORS.ORANGE }}
                  rowStyle={{ height: 30, borderBottomWidth: 0 }}
                  buttonStyle={{ width: '100%', height: 40, borderRadius: 10, marginBottom: 10, paddingHorizontal: 5, backgroundColor: COLORS.GRAY }}
                  buttonTextStyle={{ fontSize: 14 }}
                  renderDropdownIcon={() => <Icon name='chevron-down' style={{ marginRight: 10 }} type='font-awesome-5' color={COLORS.GRAY_SOFT} size={16} />}
                  onSelect={(item) => setSelectedItem(item)}
                  defaultButtonText='Seleccione una carpeta'
                  rowTextForSelection={(item) => item.name}
                  buttonTextAfterSelection={(selectedItem) => selectedItem.name}
                />

                <View style={styles.errorContainer}>
                  {!selectedItem && <Text style={{ color: COLORS.DANGER, fontSize: 12 }}>* Este campo es requerido</Text>}
                </View>

                <View style={styles.loadingContainer}>
                  {isLoading && <ActivityIndicator size='large' color={COLORS.ORANGE} />}
                </View>

                <View style={styles.transcribir}>
                  <TouchableOpacity
                    style={[styles.buttonModal, { backgroundColor: '#F3F4F6FF' }]}
                    onPress={() => closeModal()}
                    color='#353536'
                    disabled={isLoading}
                  >
                    <Text style={styles.buttonTextModal}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.buttonModal, { backgroundColor: isLoading ? COLORS.GRAY_SOFT : COLORS.ORANGE }]}
                    onPress={handleUpload}
                    disabled={isLoading}
                  >
                    <Text style={styles.buttonText}>Transcribir</Text>
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
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: COLORS.WHITE
  },
  timer: {
    fontSize: 45,
    fontWeight: '500',
    marginBottom: 50,
    marginTop: 70,
    color: COLORS.GRAY_SOFT
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14
  },
  containerSpace: {
    marginTop: '25%'
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
  },
  errorContainer: {
    height: 25,
    alignSelf: 'flex-start',
    marginBottom: 30
  },
  loadingContainer: {
    height: 100,
    justifyContent: 'center'
  }
})
