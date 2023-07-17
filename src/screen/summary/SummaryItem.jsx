import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, summaryItemScreenName } from '../../constants'

const folderIconEmpty = <Ionicons name='file-tray-full-outline' size={25} />

const SummaryItem = ({ item, openModal, folderName }) => {
  const navigation = useNavigation()
  const { id, titulo: name } = item
  return (
    <TouchableOpacity
      key={id} style={styles.summaryContainer}
      onPress={() => navigation.navigate(summaryItemScreenName, { folderName, summaryName: name })}
      onLongPress={() => openModal({ id, name })}
    >
      <View style={styles.icon}>{folderIconEmpty}</View>
      <Text>{name}</Text>
    </TouchableOpacity>
  )
}

export default SummaryItem

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    width: 350,
    marginBottom: 10,
    backgroundColor: COLORS.ORANGE
  },
  icon: {
    backgroundColor: COLORS.GRAY,
    padding: 10,
    borderRadius: 50
  }
})
