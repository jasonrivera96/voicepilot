import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, FlatList, Alert } from 'react-native'
import Constants from 'expo-constants'

import CustomModal from '../../components/CustomModal'
import Header from './Header'
import EmptyFolder from './EmptyFolder'
import ModalContent from './ModalContent'
import EditModal from './EditModal'
import { AuthContext } from '../../context/AuthContext'
import { createFolder, deleteFolder, loadFolders, updateFolder } from '../../services/FolderService'
import FolderItem from './FolderItem'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '../../constants'

const HomeScreen = () => {
  const [folders, setFolders] = useState([])
  const [folder, setFolder] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditModal, setIsEditModal] = useState(false)
  const flatList = useRef(null)
  const { userData } = useContext(AuthContext)

  const fetchData = useCallback(async () => {
    try {
      const response = await loadFolders(userData)
      setFolders(response)
    } catch (error) {
      console.error('Error al obtener las carpetas:', error.message)
    }
  }, [userData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const closeModal = () => {
    setIsModalVisible(false)
    setIsEditModal(false)
    setFolder({})
  }

  const openModal = () => {
    setIsModalVisible(true)
  }

  const addFolderItem = async (folderName) => {
    const response = await createFolder(userData, folderName)
    if (response) {
      const { id, name } = response
      setFolders((prev) => [...prev, { id, name }])
    }
    folders.length > 0 && flatList.current.scrollToEnd({ animated: true })
    setIsModalVisible(false)
  }

  const updateFolderItem = async ({ item: folderItem }) => {
    const response = await updateFolder(userData, folderItem)
    if (response) {
      const newFolders = folders.map((folder) => {
        if (folder.id === folderItem.id) {
          return { ...folder, name: folderItem.name }
        }
        return folder
      })
      setFolders(newFolders)
    }
    setFolder({})
    setIsModalVisible(false)
  }

  const deleteFolderItem = async ({ item: folderItem }) => {
    Alert.alert(
      'Eliminar carpeta',
      `Esta acción es irreversible, ¿estás seguro de eliminar la carpeta "${folderItem.name}"?`,
      [
        {
          text: 'Sí',
          onPress: async () => {
            const response = await deleteFolder(userData, folderItem.id)
            if (response.status === 200) {
              const newFolders = folders.filter((folder) => folder.id !== folderItem.id)
              setFolders(newFolders)
            }
          }
        },
        { text: 'No' }
      ],
      {
        cancelable: false
      }
    )
    setFolder({})
    setIsEditModal(false)
    setIsModalVisible(false)
  }

  const openEditModal = ({ id, name }) => {
    setFolder({ id, name })
    setIsEditModal(true)
    setIsModalVisible(true)
  }

  const renderContent = () => {
    if (folders.length === 0) {
      return <EmptyFolder openModal={openModal} />
    }
    return (
      <FlatList
        ref={flatList}
        style={styles.folderListContainer}
        data={folders}
        renderItem={({ item }) => <FolderItem item={item} openEditModal={openEditModal} />}
      />
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />
      <Header openModal={openModal} data={folders} />
      {renderContent()}
      <CustomModal isVisible={isModalVisible}>
        {!isEditModal
          ? <ModalContent onClose={closeModal} addFolderItem={addFolderItem} />
          : <EditModal
              titleButton='carpeta'
              onClose={closeModal}
              data={folder}
              updateItem={updateFolderItem}
              deleteItem={deleteFolderItem}
            />}
      </CustomModal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center'
  },
  folderListContainer: {
    alignSelf: 'flex-start',
    marginTop: 30,
    marginHorizontal: 30,
    height: '50%'
  }
})

export default HomeScreen
