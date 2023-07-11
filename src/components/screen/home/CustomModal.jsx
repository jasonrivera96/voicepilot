import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../../../constants';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';


export default function CustomModal({ isVisible, children, onClose, onCreate }) {
  const [folderName, setfolderName] = useState("")

  const handleChange = (data) => {
    setfolderName(data)
  }

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View style={styles.modalContent}>
          <View style={styles.contenet}>
            <Text style={styles.titleModal}>Create new folder</Text>
          </View>
          <View style={styles.containerInput}>
            <Text style={styles.labelInput}>Folder Name</Text>
            <TextInput onChangeText={(data) => handleChange(data)} style={styles.textInput} placeholder='Folder Name'></TextInput>
          </View>
          <View style={styles.containerButtons}>
            <TouchableOpacity
              style={styles.containerButtonCreate}
              onPress={() => onCreate(folderName)}
            >
              <Text style={styles.textButtonCreate}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.containerButtonCancelar}
              onPress={onClose}
            >
              <Text style={styles.textButtonCancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
          {children}
        </View>
    </Modal>
  );
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
      elevation: 100,
    },
    title: {
      color: 'black',
      fontSize: 16,
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 50,
      paddingVertical: 20,
    },
    titleModal: {
      fontSize: 20,
      fontWeight: 'bold',

    },
    containerButtons: {
      flexDirection: 'row-reverse',
      justifyContent: 'space-between',
      marginTop: 20,
    },
    containerButtonCreate: {
      backgroundColor: COLORS.ORANGE,
      flexDirection: 'row',
      paddingHorizontal: 20,
      width: '48%',
      height: 44,
      borderRadius: 8,
      opacity: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textButtonCreate: {
      color: '#fff',
    },
    containerButtonCancelar: {
      backgroundColor: COLORS.GRAY,
      flexDirection: 'row',
      paddingHorizontal: 20,
      width: '48%',
      height: 44,
      borderRadius: 8,
      opacity: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textButtonCancelar: {
      color: '#565E6CFF'
    },
    containerInput: {
      marginTop: 10,
      gap: 2,
    },
    labelInput: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333637'
    },
    textInput: {
      borderWidth: 1,
      backgroundColor: COLORS.GRAY,
      borderRadius: 8,
      paddingHorizontal: 15,
      height: 44,
      borderWidth: 0
    }
  });
  