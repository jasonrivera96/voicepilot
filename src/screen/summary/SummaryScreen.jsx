import React, { useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'

import { COLORS } from '../../constants'
import NavigatorPath from '../../components/NavigatorPath'
import EmptySummary from './EmpySummary'
import CustomModal from '../../components/CustomModal'
import EditModal from '../home/EditModal'
import { deleteSummary, loadSummaries, updateSummary } from '../../services/SummaryService'
import { AuthContext } from '../../context/AuthContext'
import SummaryItem from './SummaryItem'
import { StatusBar } from 'expo-status-bar'

const SummaryScreen = ({ route }) => {
  const [summaries, setSummaries] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [summary, setSummary] = useState({})
  const { userData } = useContext(AuthContext)
  const { folderId, folderName } = route.params

  const fetchData = useCallback(async () => {
    try {
      const response = await loadSummaries(userData, folderId)
      setSummaries(response)
    } catch (error) {
      console.error('Error al obtener las carpetas:', error.message)
    }
  }, [userData, folderId])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const closeModal = () => {
    setIsModalVisible(false)
    setSummary({})
  }

  const openModal = ({ id, name }) => {
    setSummary({ id, name })
    setIsModalVisible(true)
  }

  const updateSummaryItem = async ({ item: summaryItem }) => {
    const response = await updateSummary(userData, summaryItem)
    if (response) {
      const summariesUpdated = summaries.map((summary) => {
        if (summary.id === summaryItem.id) {
          return { ...summary, titulo: summaryItem.name }
        }
        return summary
      })
      setSummaries(summariesUpdated)
    }
    setIsModalVisible(false)
  }

  const deleteSummaryItem = async ({ item: summaryItem }) => {
    const { id: summaryId } = summaryItem
    const response = await deleteSummary(userData, summaryId)
    if (response.status === 200) {
      const summariesUpdated = summaries.filter((summary) => summary.id !== summaryItem.id)
      setSummaries(summariesUpdated)
    }
    setSummary({})
    setIsModalVisible(false)
  }

  const renderContent = () => {
    if (summaries.length === 0) {
      return <EmptySummary />
    }
    return (
      <FlatList
        style={styles.summaryListContainer}
        data={summaries}
        renderItem={({ item }) =>
          <SummaryItem
            item={item}
            folderName={folderName}
            openModal={openModal}
          />}
      />
    )
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />
      <NavigatorPath route={route} />
      <View style={styles.contentContainer}>
        <View style={styles.text}>
          <Text style={styles.titlePage}>Resúmenes</Text>
        </View>
      </View>
      {renderContent()}
      <CustomModal isVisible={isModalVisible}>
        <EditModal
          titleButton='resumen'
          onClose={closeModal}
          data={summary}
          updateItem={updateSummaryItem}
          deleteItem={deleteSummaryItem}
        />
      </CustomModal>
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
  summaryListContainer: {
    alignSelf: 'flex-start',
    marginTop: 30,
    marginHorizontal: 30,
    height: '70%'
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
