import React, { useContext, useEffect, useRef, useState } from 'react'
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
import { AuthContext } from '../../context/AuthContext'
import { loadFolders } from '../../services/FolderService'

const folderIcon = <Ionicons name='folder-open-outline' size={25} />

const FolderItem = ({ item, openEditModal }) => {
  const navigation = useNavigation()
  const { id, name } = item

  return (
    <TouchableOpacity
      key={id} style={styles.folderContainer}
      onPress={() => navigation.navigate(summaryScreenName, { folderName: name })}
      onLongPress={() => openEditModal({ id, name })}
    >
      <View style={styles.icon}>{folderIcon}</View>
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}

const HomeScreen = () => {
  const [folders, setFolders] = useState([])
  const [folder, setFolder] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isEditModal, setIsEditModal] = useState(false)
  const flatList = useRef(null)
  const { userData } = useContext(AuthContext)

  useEffect(() => {
    folders.length > 0 && flatList.current.scrollToEnd({ animated: true })
  }, [folders])

  useEffect(() => {
    const loadFoldersOnInit = async () => {
      const response = await loadFolders(userData)
      setFolders(response)
    }
    loadFoldersOnInit()
  }, [userData])

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

  const updateFolderItem = ({ item: folderItem }) => {
    const foldersUpdated = folders.map((item, index) => {
      if (index === folder.index) {
        return folderItem.item
      }
      return item
    })
    setFolders(foldersUpdated)
    setIsModalVisible(false)
  }

  const deleteFolderItem = ({ item: folderItem }) => {
    console.log(folderItem)
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
        ref={flatList}
        style={styles.folderListContainer}
        data={folders}
        renderItem={({ item }) => <FolderItem item={item} openEditModal={openEditModal} />}
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
    marginHorizontal: 30,
    height: '50%'
  },
  icon: {
    backgroundColor: COLORS.GRAY,
    padding: 10,
    borderRadius: 50
  }
})

export default HomeScreen
