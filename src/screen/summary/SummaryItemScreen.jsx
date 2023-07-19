import React, { useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { COLORS } from '../../constants'
import NavigatorPath from '../../components/NavigatorPath'
import { getSummary } from '../../services/SummaryService'
import { AuthContext } from '../../context/AuthContext'
import { StatusBar } from 'expo-status-bar'

const SummaryItemScreen = ({ route }) => {
  const { summaryId } = route.params
  const [summary, setSummary] = useState({})
  const { userData } = useContext(AuthContext)

  const fetchData = useCallback(async () => {
    try {
      const response = await getSummary(userData, summaryId)
      setSummary(response)
    } catch (error) {
      console.error('Error al obtener las carpetas:', error.message)
    }
  }, [summaryId, userData])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const { titulo, resumen } = summary

  return (
    <View style={styles.container}>
      <NavigatorPath route={route} />
      <StatusBar style='dark' backgroundColor='white' />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.main}>
          <Text style={styles.title}>{titulo}</Text>
          <Text style={styles.subtitle}>Resumen</Text>
          <Text style={styles.resumen}>{resumen}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default SummaryItemScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    width: '100%'
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    marginHorizontal: 25
  },
  main: {

  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20
  },
  resumen: {
    marginTop: 10,
    fontSize: 16
    // textAlign: 'justify'
  }
})
