import React, { useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { COLORS } from '../../constants'
import NavigatorPath from '../../components/NavigatorPath'
import { getSummary } from '../../services/SummaryService'
import { AuthContext } from '../../context/AuthContext'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome } from '@expo/vector-icons'

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
      <Text style={styles.title}>{titulo}</Text>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.centeredView}>

          <View style={styles.postResumen}>
            <Text style={[styles.resumen, { textAlign: 'justify' }]}>{resumen}</Text>

          </View>
          <Text style={[styles.title, { fontSize: 16 }]}>Post-it o Algo así</Text>

          {/* Palabras */}
          <View style={[styles.post, { backgroundColor: COLORS.Pastel_Mint_Green }]}>
            <View style={styles.firstColumn}>
              <FontAwesome name='file-text-o' size={40} color={COLORS.Pastel_Mint_Green_1}> </FontAwesome>
            </View>
            <View style={styles.secondColumn}>
              <Text style={[styles.subtitleP, { color: COLORS.Pastel_Mint_Green_1 }]}>Palabras Clave</Text>
              <View style={styles.row}>
                <Text style={styles.texto}>Aquí encontrarás las fechas destacadas encontradas en el audio</Text>
              </View>
            </View>
          </View>
          {/* TEMAS */}
          <View style={[styles.post, { backgroundColor: COLORS.GRAY }]}>
            <View style={styles.firstColumn}>
              <FontAwesome name='file-text-o' size={40} color={COLORS.GRAY_SOFT}> </FontAwesome>
            </View>
            <View style={styles.secondColumn}>
              <Text style={[styles.subtitleP, { color: COLORS.GRAY_SOFT }]}>Temas Destacados</Text>
              <View style={styles.row}>
                <Text style={styles.texto}>Aquí encontrarás las fechas destacadas encontradas en el audio</Text>
              </View>
            </View>
          </View>
          {/* FECHAS  */}

          <View style={styles.post}>
            <View style={styles.firstColumn}>
              <FontAwesome name='calendar-o' size={40} color={COLORS.Pastel_Orange_1}> </FontAwesome>
            </View>
            <View style={styles.secondColumn}>
              <Text style={[styles.subtitleP, { color: COLORS.Pastel_Orange_1 }]}>Fechas importantes</Text>
              <View style={styles.row}>
                <Text style={styles.texto}>Aquí encontrarás las fechas destacadas encontradas en el audio</Text>
              </View>
            </View>
          </View>

          {/* Preguntas */}
          <View style={[styles.post, { backgroundColor: COLORS.Pastel_Pink }]}>
            <View style={styles.firstColumn}>
              <FontAwesome name='file-text-o' size={40} color={COLORS.Pastel_Pink_1}> </FontAwesome>
            </View>
            <View style={styles.secondColumn}>
              <Text style={[styles.subtitleP, { color: COLORS.Pastel_Pink_1 }]}>Preguntas</Text>
              <View style={styles.row}>
                <Text style={styles.texto}>Aquí encontrarás las fechas destacadas encontradas en el audio</Text>
              </View>
            </View>
          </View>

          {/* Tareas */}
          <View style={[styles.post, { backgroundColor: COLORS.Pastel_Blue }]}>
            <View style={styles.firstColumn}>
              <FontAwesome name='file-text-o' size={40} color={COLORS.Pastel_Blue_1}> </FontAwesome>
            </View>
            <View style={styles.secondColumn}>
              <Text style={[styles.subtitleP, { color: COLORS.Pastel_Blue_1 }]}>Tareas</Text>
              <View style={styles.row}>
                <Text style={styles.texto}>Aquí encontrarás las fechas destacadas encontradas en el audio</Text>
              </View>
            </View>
          </View>

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
  centeredView: {
    flex: 1,
    alignItems: 'center',
    marginTop: '4%',

    marginBottom: '50%'
  },

  contentContainer: {
    marginTop: 7,
    marginHorizontal: 25
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: '8%',
    color: COLORS.GRAY_SOFT
  },
  resumen: {
    fontSize: 16,
    marginBottom: 10

  },
  post: {
    flexDirection: 'row',
    marginTop: '5%',
    backgroundColor: COLORS.Pastel_Orange,
    padding: 5,
    borderRadius: 10
  },
  subtitleP: {
    fontSize: 15,
    fontWeight: 'bold'

  },
  texto: {
    marginBottom: '2%',
    color: COLORS.GRAY_EXTRA_SOFT
  },
  firstColumn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  secondColumn: {
    flex: 3
  },
  row: {
    flexDirection: 'row',
    marginTop: 8
  }

})
