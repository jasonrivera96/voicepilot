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
      onPress={() => navigation.navigate(summaryItemScreenName, { folderName, summaryName: name, summaryId: id })}
      onLongPress={() => openModal({ id, name })}
    >
      <View style={styles.principal}>
        <View style={styles.icon}>{folderIconEmpty}</View>
        <Text style={styles.summaryName}>{name.length > 50 ? name.substring(0, 50) + '...' : name}</Text>
      </View>
      <View style={styles.secondary}>
        <Text style={styles.estado}>Leer</Text>
      </View>
    </TouchableOpacity>
  )
}

export default SummaryItem

const styles = StyleSheet.create({
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 10
  },
  principal: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '80%'
  },
  secondary: {
    width: '20%',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: COLORS.GREEN_SOFT
  },
  icon: {
    backgroundColor: COLORS.GRAY,
    padding: 10,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  summaryName: {
    maxWidth: '80%'
  },
  estado: {
    color: COLORS.GREEN
  }
})
