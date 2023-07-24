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

import { AuthContext } from '../context/AuthContext'
import { Icon } from 'react-native-elements'

export default function RecorderScreen () {
  const [recording, setRecording] = useState()
  const [recordings, setRecordings] = useState([])
  const [message, setMessage] = useState('')
  // variables para el cronometro
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [hours, setHours] = useState(0)
  const [customInterval, setCustomInterval] = useState()
  // variables para el modal
  const [recordingName, setRecordingName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  // variable para obtener las carpetas
  const [dropdownItems, setDropdownItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [isLoading, setisLoading] = useState(false)

  const [folders, setFolders] = useState([])
  const { userData } = useContext(AuthContext)

  const fetchData = useCallback(async () => {
    try {
      const response = await loadFolders(userData)
      setFolders(response)

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
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
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
      } else {
        setMessage('Presióname para iniciar a grabar')
      }
    } catch (error) {
      console.error('Failed to start recording', error)
    }
  }

  const stopRecording = async () => {
    if (recording) {
      setRecording(undefined)
      await recording.stopAndUnloadAsync()
      const { sound, status } = await recording.createNewLoadedSoundAsync()
      const updatedRecordings = [...recordings, {
        sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI()
      }]
      handleSendRecordings()
      setRecordings(updatedRecordings)
      clearInterval(customInterval)
    }
  }

  const getDurationFormatted = (millis) => {
    const hours = Math.floor(millis / 1000 / 60 / 60)
    const minutes = Math.floor(millis / 1000 / 60)
    const seconds = Math.round((millis / 1000) % 60)
    const hoursDisplay = hours < 10 ? `0${hours}` : hours
    const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds
    return `${hoursDisplay}:${minutesDisplay}:${secondsDisplay}`
  }

  const handleSendRecordings = () => {
    fetchData()
    setModalVisible(true)
  }

  const handleUpload = async () => {
    if (!selectedItem) {
      return
    }
    Keyboard.dismiss()
    setisLoading(true)
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

  // PARA LOS BOTONES DE REPRODUCIR EL AUDIO Y DESCARGAR

  // const playRecording = async (sound) => {
  //   await sound.setVolumeAsync(1.0)
  //   await sound.replayAsync()
  // }

  // const shareRecording = async (file) => {
  //   await Sharing.shareAsync(file)
  // }

  // Abre la ventana emergente para ingresar los detalles del audio

  // LISTADO DE GRABACIONES
  // const renderRecordingLines = () => {
  //   return recordings.map((recordingLine, index) => {
  //     return (
  //       <View key={index} style={styles.row}>
  //         <Text style={styles.fill}>Grabación {index + 1} - {recordingLine.duration}</Text>
  //         <TouchableOpacity
  //           style={styles.button}
  //           onPress={() => playRecording(recordingLine.sound)}
  //         >
  //           <FontAwesome name='play' size={15} color='black' />
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={styles.button}
  //           onPress={() => shareRecording(recordingLine.file)}
  //         >
  //           <FontAwesome name='download' size={15} color='black' />
  //         </TouchableOpacity>
  //       </View>
  //     )
  //   })
  // }

  return (

    <View style={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />
      <Text style={styles.timer}>{`${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</Text>
      <Text>{message}</Text>
      {/* <Text style={styles.instructions}>Presiona para iniciar a grabar</Text> */}
      <Text style={styles.instructions} />

      <CustomRecorderButton stopRecording={stopRecording} startRecording={startRecording} />

      {/* {renderRecordingLines()} */}

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
                  onSelect={(item) => setSelectedItem(item.id)}
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
  instructions: {
    fontSize: 16,
    marginBottom: 50,
    color: COLORS.GRAY_SOFT
  },

  // row: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   marginBottom: 10
  // },
  // fill: {
  //   flex: 1
  // },
  // button: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   backgroundColor: COLORS.GRAY,
  //   paddingHorizontal: 10,
  //   paddingVertical: 5,
  //   marginRight: 10
  // },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
    fontSize: 14
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
  },
  stopButton: {
    backgroundColor: COLORS.ORANGE,
    paddingVertical: 5,
    paddingHorizontal: 35,
    borderRadius: 50,
    marginTop: 80
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
