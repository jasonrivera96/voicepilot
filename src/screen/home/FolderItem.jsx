import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native'
import { COLORS, summaryScreenName } from '../../constants'

const folderIcon = <Ionicons name='folder-open-outline' size={25} />

const FolderItem = ({ item, openEditModal }) => {
  const navigation = useNavigation()
  const { id, name } = item

  return (
    <TouchableOpacity
      key={id} style={styles.folderContainer}
      onPress={() => navigation.navigate(summaryScreenName, { folderId: id, folderName: name })}
      onLongPress={() => openEditModal({ id, name })}
    >
      <View style={styles.icon}>{folderIcon}</View>
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}

export default FolderItem

const styles = StyleSheet.create({
  folderContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    width: 350,
    marginBottom: 10
  },
  icon: {
    backgroundColor: COLORS.GRAY,
    padding: 10,
    borderRadius: 50
  }
})
