import React, { useState } from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'

import { COLORS, summaryItemScreenName } from '../../constants'
import NavigatorPath from '../../components/NavigatorPath'
import EmptySummary from './EmpySummary'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const folderIconEmpty = <Ionicons name='file-tray-full-outline' size={25} />

const SummaryItem = ({ item, index, openEditModal, folderName }) => {
  const navigation = useNavigation()

  return (
    <TouchableOpacity
      key={index} style={styles.summaryContainer}
      onPress={() => navigation.navigate(summaryItemScreenName, { folderName, summaryName: item })}
      onLongPress={() => openEditModal({ index, item })}
    >
      <View style={styles.icon}>{folderIconEmpty}</View>
      <Text>{item}</Text>
    </TouchableOpacity>
  )
}

const SummaryScreen = ({ route }) => {
  const [summaries, setSummaries] = useState(['SCRUM', 'Kanban', 'XP', 'Lean', 'Agile', 'Otros'])

  const { folderName } = route.params

  const renderContent = () => {
    if (summaries.length === 0) {
      return <EmptySummary />
    }
    return (
      <FlatList
        style={styles.summaryListContainer}
        data={summaries}
        renderItem={({ item, index }) =>
          <SummaryItem
            item={item}
            index={index}
            folderName={folderName}
          />}
      />
    )
  }

  return (
    <View style={styles.container}>
      <NavigatorPath route={route} />
      <View style={styles.contentContainer}>
        <View style={styles.text}>
          <Text style={styles.titlePage}>Resúmenes</Text>
        </View>
      </View>
      {renderContent()}
    </View>
  )
}

export default SummaryScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  containerPath: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  textPath: {
    color: COLORS.ORANGE
  },
  spacing: {
    marginHorizontal: 5
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
    width: 350,
    marginBottom: 10
  },
  summaryListContainer: {
    alignSelf: 'flex-start',
    marginTop: 30,
    marginHorizontal: 30
  },
  icon: {
    backgroundColor: COLORS.GRAY,
    padding: 10,
    borderRadius: 50
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  },
  text: {
    width: '70%'
  },
  titlePage: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
