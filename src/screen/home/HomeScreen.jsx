import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, FlatList, Alert, Keyboard } from 'react-native'
import Constants from 'expo-constants'

import CustomModal from '../../components/CustomModal'
import Header from './Header'
import EmptyFolder from './EmptyFolder'
import ModalContent from './ModalContent'
import EditModal from './EditModal'
import FolderItem from './FolderItem'
import { StatusBar } from 'expo-status-bar'
import { COLORS } from '../../constants'
import { useFolder } from '../../hooks/useFolder'

import { useAppContext } from '../../context/AppContext'

const HomeScreen = () => {
  const { state, getFolders, addFolder, updateFolde, removeFolder } = useFolder()
  const { showAlert, setShowAlert } = useAppContext()
  const [folder, setFolder] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditModal, setIsEditModal] = useState(false)
  const flatList = useRef(null)

  useEffect(() => {
    getFolders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const { folders } = state

  const closeModal = () => {
    setIsModalVisible(false)
    setIsEditModal(false)
    setFolder({})
  }

  const openModal = () => {
    setIsModalVisible(true)
  }

  const addFolderItem = async (folderName) => {
    Keyboard.dismiss()
    await addFolder(folderName)
    flatList.current.scrollToEnd({ animated: true }) // !!! TODO ojito
    setIsModalVisible(false)
    setShowAlert('Carpeta creada.')
  }

  const updateFolderItem = async ({ item: folderItem }) => {
    updateFolde(folderItem)
    setFolder({})
    setIsModalVisible(false)
    setShowAlert('Carpeta actualizada')
    setIsEditModal(false)
  }

  const deleteFolderItem = async ({ item: folderItem }) => {
    Alert.alert(
      'Eliminar carpeta',
      `Esta acción es irreversible, ¿estás seguro de eliminar la carpeta "${folderItem.name}"?`,
      [
        {
          text: 'Sí',
          onPress: async () => {
            removeFolder(folderItem)
            setShowAlert('Carpeta eliminada')
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
          ? <ModalContent onClose={closeModal} addFolderItem={addFolderItem} setShowAlert={setShowAlert} />
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
    marginHorizontal: 30
  }
})

export default HomeScreen
