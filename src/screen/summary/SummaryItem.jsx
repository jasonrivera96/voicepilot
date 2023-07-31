import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, summaryItemScreenName } from '../../constants'

const SummaryItem = ({ item, openModal, folderName }) => {
  const navigation = useNavigation()
  const { id, titulo: name, completed } = item
  const title = name || 'Procesando resumen'
  return (
    <TouchableOpacity
      key={id} style={styles.summaryContainer}
      disabled={!completed}
      onPress={() => navigation.navigate(summaryItemScreenName, { folderName, summaryName: name, summaryId: id })}
      onLongPress={() => openModal({ id, name })}
    >
      <View style={styles.principal}>
        <View style={[styles.icon, { backgroundColor: completed ? COLORS.GRAY : COLORS.WHITE, borderWidth: completed ? 0 : 1, borderColor: completed ? COLORS.GRAY : COLORS.ORANGE }]}>
          <Ionicons name='file-tray-full-outline' size={25} color={completed ? 'black' : COLORS.ORANGE} />
        </View>
        <Text style={[styles.summaryName, { color: completed ? 'black' : COLORS.ORANGE }]}>{title.length > 50 ? title.substring(0, 50) + '...' : title}</Text>
      </View>
      <View style={[styles.secondary, { backgroundColor: completed ? COLORS.GREEN_SOFT : COLORS.ORANGE_EXTRA_SOFT }]}>
        <Text style={[styles.estado, { color: completed ? COLORS.GREEN : COLORS.ORANGE }]}>{completed ? 'Leer' : 'En curso'}</Text>
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
