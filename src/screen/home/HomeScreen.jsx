import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import Constants from 'expo-constants'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

import { COLORS, summaryScreenName } from '../../constants'
import CustomModal from '../../components/CustomModal'
import Header from './Header'
import EmptyFolder from './EmptyFolder'
import ModalContent from './ModalContent'
import EditModal from './EditModal'

const folderIcon = <Ionicons name='folder-open-outline' size={25} />

const FolderItem = ({ item, index, openEditModal }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      key={index} style={styles.folderContainer}
      onPress={() => navigation.navigate(summaryScreenName, { folderName: item })}
      onLongPress={() => openEditModal({ index, item })}
    >
      <View style={styles.icon}>{folderIcon}</View>
      <Text>{item}</Text>
    </TouchableOpacity>
  )
}

const HomeScreen = () => {
  // const [folders, setFolders] = useState([])
  const [folders, setFolders] = useState(['Software', 'Conferencias', 'Tesis', 'Talleres', 'Cursos', 'Libros', 'Artículos', 'Tutoriales', 'Proyectos', 'Otros'])
  const [folder, setFolder] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditModal, setIsEditModal] = useState(false)

  const closeModal = () => {
    setIsModalVisible(false)
    setIsEditModal(false)
    setFolder({})
  }

  const openModal = () => {
    setIsModalVisible(true)
  }

  const addFolderItem = (folderName) => {
    setIsModalVisible(false)
    setFolders((prev) => [...prev, folderName])
  }

  const updateFolderItem = ({ folderItem }) => {
    console.log(folderItem)
    const foldersUpdated = folders.map((item, index) => {
      if (index === folder.index) {
        return folderItem.item
      }
      return item
    })
    setFolders(foldersUpdated)
    setIsModalVisible(false)
  }

  const deleteFolderItem = ({ folderItem }) => {
    const foldersUpdated = folders.filter((item, index) => index !== folderItem.index)
    setFolders(foldersUpdated)
    setFolder({})
    setIsEditModal(false)
    setIsModalVisible(false)
  }

  const openEditModal = ({ index, item }) => {
    setFolder({ index, item })
    setIsEditModal(true)
    setIsModalVisible(true)
  }

  const renderContent = () => {
    if (folders.length === 0) {
      return <EmptyFolder openModal={openModal} />
    }
    return (
      <FlatList
        style={styles.folderListContainer}
        data={folders}
        renderItem={({ item, index }) => <FolderItem item={item} index={index} openEditModal={openEditModal} />}
      />
    )
  }

  return (
    <View style={styles.container}>
      <Header openModal={openModal} data={folders} />
      {renderContent()}
      <CustomModal isVisible={isModalVisible}>
        {!isEditModal
          ? <ModalContent onClose={closeModal} addFolderItem={addFolderItem} />
          : <EditModal
              onClose={closeModal}
              folder={folder}
              updateFolderItem={updateFolderItem}
              deleteFolderItem={deleteFolderItem}
            />}
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
  }
})

export default HomeScreen
