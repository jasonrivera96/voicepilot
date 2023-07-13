import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList } from 'react-native'
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'

import { COLORS } from '../constants'
import CustomModal from '../components/CustomModal'

const folderIcon = <Ionicons name='folder-open-outline' size={25} />
const folderIconEmpty = <Ionicons name='folder-open-outline' size={50} />
const addIcon = <Ionicons name='add' size={30} color='white' />

const Header = ({ openModal, data }) => {
  return (
    <View style={styles.contentContainer}>
      {data && data.length
        ? (
          <TouchableOpacity onPress={openModal} style={styles.addIcon}>
            <Text>{addIcon}</Text>
          </TouchableOpacity>
          )
        : (<View />)}
      <View style={styles.text}>
        <Text style={styles.titlePage}>Mi Espacio de Trabajo</Text>
      </View>
    </View>
  )
}

const EmptyFolder = ({ openModal }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconEmpty}>{folderIconEmpty}</View>
      <Text style={styles.message}>Está vacío aquí</Text>
      <Text style={styles.description}>
        Ea ea occaecat labore labore proident fugiat sunt do in magna
      </Text>
      <TouchableOpacity onPress={openModal} style={styles.containerButton}>
        {addIcon}
        <Text style={styles.textButton}>Crear</Text>
      </TouchableOpacity>
    </View>
  )
}

const FolderItem = ({ item, index }) => {
  return (
    <TouchableOpacity key={index} style={styles.folderContainer}>
      <View style={styles.icon}>{folderIcon}</View>
      <Text>{item}</Text>
    </TouchableOpacity>
  )
}

const ModalContent = ({ onClose, addFolderItem }) => {
  const [folderName, setfolderName] = useState('')
  const handleChange = (data) => {
    setfolderName(data)
  }

  return (
    <View>
      <View style={stylesModalContent.contenet}>
        <Text style={stylesModalContent.titleModal}>Crear nueva carpeta</Text>
      </View>
      <View style={stylesModalContent.containerInput}>
        <Text style={stylesModalContent.labelInput}>Nombre de carpeta</Text>
        <TextInput onChangeText={(data) => handleChange(data)} style={stylesModalContent.textInput} placeholder='Nombre de carpeta' />
      </View>
      <View style={stylesModalContent.containerButtons}>
        <TouchableOpacity
          style={stylesModalContent.containerButtonCreate}
          onPress={() => addFolderItem(folderName)}
        >
          <Text style={stylesModalContent.textButtonCreate}>Crear</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={stylesModalContent.containerButtonCancelar}
          onPress={onClose}
        >
          <Text style={stylesModalContent.textButtonCancelar}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const HomeScreen = () => {
  const [folders, setFolders] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)

  const closeModal = () => {
    setIsModalVisible(false)
  }

  const openModal = () => {
    setIsModalVisible(true)
  }

  const addFolderItem = (folderName) => {
    setIsModalVisible(false)
    setFolders((prev) => [...prev, folderName])
  }

  const renderContent = () => {
    if (folders.length === 0) {
      return <EmptyFolder openModal={openModal} />
    }
    return (
      <FlatList
        style={styles.folderListContainer}
        data={folders}
        renderItem={({ item, index }) => <FolderItem item={item} index={index} />}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Header openModal={openModal} data={folders} />
      {renderContent()}
      <CustomModal isVisible={isModalVisible}>
        <ModalContent onClose={closeModal} addFolderItem={addFolderItem} />
      </CustomModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 80
  },
  addIcon: {
    backgroundColor: COLORS.ORANGE,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    position: 'absolute',
    left: -28
  },
  text: {
    width: '70%'
  },
  titlePage: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  folderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    width: 350,
    marginBottom: 10
  },
  folderListContainer: {
    alignSelf: 'flex-start',
    marginTop: 30,
    marginHorizontal: 30
  },
  icon: {
    backgroundColor: COLORS.GRAY,
    padding: 10,
    borderRadius: 50
  },
  iconEmpty: {
    backgroundColor: '#F3F4F6FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: 128,
    height: 128,
    borderRadius: 64
  },
  message: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30
  },
  description: {
    fontSize: 18,
    marginHorizontal: 40,
    textAlign: 'center',
    marginTop: 10,
    color: '#9095A0FF'
  },
  containerButton: {
    backgroundColor: '#FF7700FF',
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: 152,
    height: 44,
    borderRadius: 8,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24
  },
  textButton: {
    color: '#fff'
  }
})

const stylesModalContent = StyleSheet.create({
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
    color: '#333637'
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
  textButtonCreate: {
    color: '#fff'
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
    color: '#565E6CFF'
  },
  textInput: {
    backgroundColor: COLORS.GRAY,
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 44,
    borderWidth: 0
  }
})

export default HomeScreen
