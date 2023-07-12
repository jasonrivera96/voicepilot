import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity, Modal, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Audio } from 'expo-av';
import * as Sharing from 'expo-sharing';
import { FontAwesome } from '@expo/vector-icons';
import { COLORS } from '../constants';
import axios from 'axios';
import Dropdown from 'react-native-select-dropdown';



export default function RecorderScreen() {
  const [recording, setRecording] = useState();
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [customInterval, setCustomInterval] = useState();
  //variables para el modal
  const [recordingName, setRecordingName] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('');
  const [description, setDescription] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  //variable para obtener las carpetas
  const [dropdownItems, setDropdownItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);




  useEffect(() => {
    return () => {
      if (customInterval) {
        clearInterval(customInterval);
      }
    };
  }, [customInterval]);

  const sendRecordings = async () => {
    try {
      // Envía los archivos de audio al backend utilizando Axios
      await axios.post('URL_DEL_BACKEND', { recordings });
      // Limpia la lista de grabaciones después de enviarlas al backend
      setRecordings([]);
    } catch (error) {
      console.error('Failed to send recordings to backend', error);
    }
  };

  const startRecording = async () => {
    try {
      const permission = await Audio.requestPermissionsAsync();
      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true
        });

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
        setCustomInterval(
          setInterval(() => {
            setSeconds(prevSeconds => {
              if (prevSeconds + 1 === 60) {
                setMinutes(prevMinutes => prevMinutes + 1);
                return 0;
              }
              return prevSeconds + 1;
            });
          }, 1000)
        );
      } else {
        setMessage("Presióname para iniciar a grabar");
      }
    } catch (error) {
      console.error('Failed to start recording', error);
    }
  };

  const stopRecording = async () => {
    if (recording) {
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      const { sound, status } = await recording.createNewLoadedSoundAsync();
      const updatedRecordings = [...recordings, {
        sound: sound,
        duration: getDurationFormatted(status.durationMillis),
        file: recording.getURI()
      }];
      setRecordings(updatedRecordings);
      clearInterval(customInterval);
    }
  };

  const getDurationFormatted = (millis) => {
    const minutes = Math.floor(millis / 1000 / 60);
    const seconds = Math.round((millis / 1000) % 60);
    const minutesDisplay = minutes < 10 ? `0${minutes}` : minutes;
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  };

  const playRecording = async (sound) => {
    await sound.setVolumeAsync(1.0);
    await sound.replayAsync();
  };

  const shareRecording = async (file) => {
    await Sharing.shareAsync(file);
  };
  // Abre la ventana emergente para ingresar los detalles del audio
  const handleSendRecordings = () => {
    setModalVisible(true);
  };

  const renderRecordingLines = () => {
    return recordings.map((recordingLine, index) => {
      return (
        <View key={index} style={styles.row}>
          <Text style={styles.fill}>Grabación {index + 1} - {recordingLine.duration}</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => playRecording(recordingLine.sound)}
          >
            <FontAwesome name="play" size={15} color="black" />

          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => shareRecording(recordingLine.file)}
          >
            <FontAwesome name="download" size={15} color="black" />

          </TouchableOpacity>

        </View>
      );
    });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.timer}>{`${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`}</Text>
          <StatusBar style="auto" />
          <Text>{message}</Text>
          <Text style={styles.instructions}>Presiona para iniciar a grabar</Text>
          <TouchableOpacity
            onPress={recording ? stopRecording : startRecording}
            style={styles.recordButton}
          >
            <FontAwesome name="microphone" color="#FF7700FF" size={200} />
          </TouchableOpacity>
          {renderRecordingLines()}
          <Button
            color='#E46B00FF'
            onPress={handleSendRecordings}
            title="Guardar"
          />

          <Modal visible={modalVisible} animationType="slide" transparent={true}>
            <KeyboardAvoidingView
              style={styles.modalContainer}
              behavior={Platform.OS === 'ios' ? 'padding' : null}
              keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
              <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.modalContainer}>
                  <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Guardar Grabación</Text>

                    <Text style={styles.label}>Nombre del audio:</Text>
                    <TextInput
                      style={styles.input}
                      value={recordingName}
                      onChangeText={setRecordingName}
                    />

                    <Text style={styles.label}>Seleccione la carpeta:</Text>
                    <Dropdown
                      // items={dropdownItems}
                      // defaultValue={selectedItem}
                      label="Seleccione una opción"
                      containerStyle={{ height: 40, width: "100%" }}
                    // onChangeItem={(item) => setSelectedItem(item.value)}
                    />

                    <Text style={styles.label}>Descripción:</Text>
                    <TextInput
                      style={styles.input}
                      value={description}
                      onChangeText={setDescription}
                      multiline={true}
                    />

                    {/* <Button title="Transcribir" onPress={handleTranscribe} /> */}

                    <Button title="Cerrar" onPress={() => setModalVisible(false)} />
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
          </Modal>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>



  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  instructions: {
    fontSize: 16,
    marginBottom: 20,
  },
  recordButton: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fill: {
    flex: 1,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.GRAY,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    width: "100%",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
    backgroundColor: "#F3F4F6FF"
  },
});
