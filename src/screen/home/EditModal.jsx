import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

import { COLORS } from '../../constants'

const EditModal = ({ onClose, folder, deleteFolderItem, updateFolderItem }) => {
  const [folderItem, setFolderItem] = useState(folder)
  const handleChange = (data) => {
    setFolderItem({ ...folderItem, item: data })
  }

  return (
    <View>
      <View style={styles.contenet}>
        <Text style={styles.titleModal}>Acciones</Text>
      </View>
      <View style={styles.containerInput}>
        <Text style={styles.labelInput}>Cambiar nombre</Text>
        <TextInput
          value={folderItem.item}
          onChangeText={(data) => handleChange(data)}
          style={styles.textInput}
        />
      </View>

      <View>
        <TouchableOpacity
          style={styles.containerDeleteButton}
          onPress={() => deleteFolderItem({ folderItem })}
        >
          <Text style={styles.textDeleteButton}>Eliminar carpeta</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.containerButtons}>
        <TouchableOpacity
          style={styles.containerButtonCreate}
          onPress={() => updateFolderItem({ folderItem })}
        >
          <Text style={styles.textButtonCreate}>Actualizar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerButtonCancelar}
          onPress={onClose}
        >
          <Text style={styles.textButtonCancelar}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default EditModal

const styles = StyleSheet.create({
  titleModal: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  containerInput: {
    marginTop: 10,
    gap: 2
  },
  labelInput: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.GRAY_SOFT
  },
  containerButtons: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-between',
    marginTop: 20
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
    alignItems: 'center'
  },
  containerDeleteButton: {
    backgroundColor: COLORS.DANGER_EXTRA_SOFT,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    height: 44,
    borderRadius: 8,
    opacity: 1,
    marginTop: 60
  },
  textDeleteButton: {
    color: COLORS.DANGER
  },
  textButtonCreate: {
    color: COLORS.WHITE
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
    alignItems: 'center'
  },
  textButtonCancelar: {
    color: COLORS.GRAY_SOFT
  },
  textInput: {
    backgroundColor: COLORS.GRAY,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 44,
    borderWidth: 0
  }
})
