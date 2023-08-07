import React, { useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import socket from '../../config/socket'

import { COLORS } from '../../constants'
import NavigatorPath from '../../components/NavigatorPath'
import EmptySummary from './EmpySummary'
import CustomModal from '../../components/CustomModal'
import EditModal from '../home/EditModal'
import { deleteSummary, getSummaryResponse, loadSummaries, updateSummary } from '../../services/SummaryService'
import { AuthContext } from '../../context/AuthContext'
import SummaryItem from './SummaryItem'
import { useNotificationContext } from '../../context/NotificationContext'

const SummaryScreen = ({ route }) => {
  const [summaries, setSummaries] = useState([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [summary, setSummary] = useState({})
  const { userData } = useContext(AuthContext)
  const { setNotification } = useNotificationContext()
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

  useEffect(() => {
    socket.on('completed', handleCompletedEvent)
    socket.on('processing', handleProcessingEvent)
    return () => {
      socket.off('completed')
      socket.off('processing')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [summaries])

  const handleProcessingEvent = (data) => {
    console.log('Processing event')
    const { summaryId, transcriptionId } = data
    const newSummary = {
      titulo: `Procesando resumen - ${transcriptionId.substring(0, 7)}`,
      completed: false,
      id: summaryId,
      transcriptionId
    }
    setSummaries((summaries) => [...summaries, newSummary])
  }

  const handleCompletedEvent = async (data) => {
    console.log('Completed event')
    const { summaryId } = data
    const { titulo, completed } = await getSummaryResponse(userData, summaryId)

    const summariesUpdated = summaries.map((summary) => {
      if (summary.id === summaryId) {
        return {
          ...summary,
          completed,
          titulo
        }
      }
      return summary
    })
    setSummaries(summariesUpdated)
  }

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
    setNotification({
      message: 'Resumen actualizado',
      level: 'success'
    })
  }

  const deleteSummaryItem = async ({ item: summaryItem }) => {
    setIsModalVisible(false)
    Alert.alert(
      'Eliminar archivo',
      `Esta acción es irreversible, ¿estás seguro de eliminar el archivo "${summaryItem.name}"?`,
      [
        {
          text: 'Sí',
          onPress: async () => {
            const { id: summaryId } = summaryItem
            const response = await deleteSummary(userData, summaryId)
            if (response.status === 200) {
              const summariesUpdated = summaries.filter((summary) => summary.id !== summaryItem.id)
              setSummaries(summariesUpdated)
              setSummary({})
              setNotification({
                message: 'Resumen eliminado',
                level: 'success'
              })
            } else {
              setNotification({
                message: 'Error al eliminar el resumen',
                level: 'error'
              })
            }
          }
        },
        { text: 'No' }
      ],
      {
        cancelable: false
      }
    )
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
      <View style={styles.containerPath}>
        <NavigatorPath route={route} />
      </View>
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
    backgroundColor: COLORS.WHITE,
    alignItems: 'center'
  },
  containerPath: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
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
    marginHorizontal: 30
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
