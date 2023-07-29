import React, { useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity } from 'react-native'
import { COLORS } from '../../constants'
import NavigatorPath from '../../components/NavigatorPath'
import { getSummary } from '../../services/SummaryService'
import { AuthContext } from '../../context/AuthContext'
import { StatusBar } from 'expo-status-bar'
import SubArticle from './post/SubArticle'
import Fechas from './post/Fechas'
import Palabras from './post/Palabras'
import Temas from './post/Temas'
import Preguntas from './post/Preguntas'
import Tareas from './post/Tareas'
import { Icon } from 'react-native-elements'
import Ejemplos from './post/Ejemplos'
import Nombres from './post/Nombres'

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

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedPost, setSelectedPost] = useState({
    title: '',
    color: COLORS.GRAY_SOFT,
    icon: 'file-text-o',
    iconColor: COLORS.GREEN_MINT_PASTEL_TEXT,
    info: null
  })
  const handleOpenModal = (title, color, icon, type, iconColor, info) => {
    setSelectedPost({ title, color, icon, type, iconColor, info })

    setIsModalVisible(true)
  }

  const { titulo, resumen, subArticuloList, palabras, temas, fechas, preguntas, tareas, ejemplos, nombres } = summary

  return (
    <View style={styles.container}>
      <View style={styles.containerPath}>
        <NavigatorPath route={route} />
      </View>
      <StatusBar style='dark' backgroundColor='white' />
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>{titulo}</Text>

        <View style={styles.centeredView}>

          <View style={styles.postResumen}>
            {resumen && <Text style={styles.resumen}>{resumen}</Text>}
            <SubArticle data={subArticuloList} />
          </View>

          {
            (palabras && palabras.length) > 0 &&
              <Text style={[styles.title, { fontSize: 18 }]}>Tópicos destacados</Text>
          }

          {/* Palabras */}
          {palabras && palabras.length > 0 && (
            <TouchableOpacity
              onPress={() =>
                handleOpenModal(
                  'Palabras clave',
                  COLORS.YELLOW_PASTEL_FONT,
                  'text-search',
                  'material-community',
                  COLORS.YELLOW_PASTEL_TEXT,
                  <Palabras data={palabras} />
                )}
              style={[styles.post, { backgroundColor: COLORS.YELLOW_PASTEL_FONT }]}
            >
              <View style={styles.firstColumn}>
                <Icon type='material-community' name='text-search' size={40} color={COLORS.YELLOW_PASTEL_TEXT} />
              </View>
              <View style={styles.secondColumn}>
                <Text style={[styles.subtitleP, { color: COLORS.YELLOW_PASTEL_TEXT }]}>Palabras clave</Text>
                <View style={styles.row}>
                  <Text style={[styles.texto, { color: COLORS.YELLOW_PASTEL_TEXT }]}>Describe las palabras más importantes y con mayor mención en el texto</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {/* TEMAS */}
          {temas && temas.length > 0 && (
            <TouchableOpacity
              onPress={() =>
                handleOpenModal(
                  'Definiciones',
                  COLORS.GRAY,
                  'message-text-outline',
                  'material-community',
                  COLORS.GREEN_MINT_PASTEL_TEXT,
                  <Temas data={temas} />
                )}
              style={[styles.post, { backgroundColor: COLORS.GREEN_MINT_PASTEL_FONT }]}
            >
              <View style={styles.firstColumn}>
                <Icon type='material-community' name='message-text-outline' size={40} color={COLORS.GREEN_MINT_PASTEL_TEXT} />
              </View>
              <View style={styles.secondColumn}>
                <Text style={[styles.subtitleP, { color: COLORS.GREEN_MINT_PASTEL_TEXT }]}>Definiciones</Text>
                <View style={styles.row}>
                  <Text style={[styles.texto, { color: COLORS.GREEN_MINT_PASTEL_TEXT }]}>Temas, conceptos y definiciones con mayor relevancia y mención en le texto</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {/* NOMBRES   */}
          {nombres && nombres.length > 0 && (
            <TouchableOpacity
              onPress={() =>
                handleOpenModal(
                  'Nombres destacados',
                  COLORS.CIAN_PASTEL_TEXT,
                  'person',
                  'octions',
                  COLORS.CIAN_PASTEL_TEXT,
                  <Nombres data={nombres} />
                )}
              style={[styles.post, { backgroundColor: COLORS.CIAN_PASTEL_FONT }]}
            >
              <View style={styles.firstColumn}>
                <Icon type='octions' name='person' size={40} color={COLORS.CIAN_PASTEL_TEXT} />
              </View>
              <View style={styles.secondColumn}>
                <Text style={[styles.subtitleP, { color: COLORS.CIAN_PASTEL_TEXT }]}>Nombres destacados</Text>
                <View style={styles.row}>
                  <Text style={[styles.texto, { color: COLORS.CIAN_PASTEL_TEXT }]}>Nombres de personas relevantes para el enriquecimiento del texto. </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {/* Tareas */}
          {tareas && tareas.length > 0 && (
            <TouchableOpacity
              onPress={() =>
                handleOpenModal(
                  'Tareas',
                  COLORS.BLUE_PASTEL_FONT,
                  'tasklist',
                  'octicon',
                  COLORS.BLUE_PASTEL_TEXT,
                  <Tareas data={tareas} />
                )}
              style={[styles.post, { backgroundColor: COLORS.BLUE_PASTEL_FONT }]}
            >
              <View style={styles.firstColumn}>
                <Icon type='octicon' name='tasklist' size={40} color={COLORS.BLUE_PASTEL_TEXT} />
              </View>
              <View style={styles.secondColumn}>
                <Text style={[styles.subtitleP, { color: COLORS.BLUE_PASTEL_TEXT }]}>Tareas</Text>
                <View style={styles.row}>
                  <Text style={[styles.texto, { color: COLORS.BLUE_PASTEL_TEXT }]}>Tareas, proyectos y actividades planificadas para los próximos días</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {/* FECHAS  */}
          {fechas && fechas.length > 0 && (
            <TouchableOpacity
              onPress={() =>
                handleOpenModal(
                  'Eventos',
                  COLORS.ORANGE_PASTEL_TEXT,
                  'calendar-o',
                  'font-awesome',
                  COLORS.ORANGE_PASTEL_TEXT,
                  <Fechas data={fechas} />
                )}
              style={[styles.post, { backgroundColor: COLORS.ORANGE_PASTEL_FONT }]}
            >
              <View style={styles.firstColumn}>
                <Icon type='font-awesome' name='calendar-o' size={40} color={COLORS.ORANGE_PASTEL_TEXT} />
              </View>
              <View style={styles.secondColumn}>
                <Text style={[styles.subtitleP, { color: COLORS.ORANGE_PASTEL_TEXT }]}>Eventos</Text>
                <View style={styles.row}>
                  <Text style={[styles.texto, { color: COLORS.ORANGE_PASTEL_TEXT }]}>Fechas, eventos y sucesos considerados clave dentro del texto </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
          {/* Preguntas */}
          {preguntas && preguntas.length > 0 && (
            <TouchableOpacity
              onPress={() =>
                handleOpenModal(
                  'Preguntas',
                  COLORS.PINK_PASTEL_FONT,
                  'question',
                  'font-awesome',
                  COLORS.PINK_PASTEL_TEXT,
                  <Preguntas data={preguntas} />
                )}
              style={[styles.post, { backgroundColor: COLORS.PINK_PASTEL_FONT }]}
            >
              <View style={styles.firstColumn}>
                <Icon type='font-awesome' name='question' size={40} color={COLORS.PINK_PASTEL_TEXT} />
              </View>
              <View style={styles.secondColumn}>
                <Text style={[styles.subtitleP, { color: COLORS.PINK_PASTEL_TEXT }]}>Preguntas</Text>
                <View style={styles.row}>
                  <Text style={[styles.texto, { color: COLORS.PINK_PASTEL_TEXT }]}>Preguntas de apoyo para complementar la información recopilada</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          {/* Ejemplos */}
          {ejemplos && ejemplos.length > 0 && (
            <TouchableOpacity
              onPress={() =>
                handleOpenModal(
                  'Ejemplos',
                  COLORS.VIOLET_PASTEL_FONT,
                  'lightbulb-o',
                  'font-awesome',
                  COLORS.VIOLET_PASTEL_TEXT,
                  <Ejemplos data={ejemplos} />
                )}
              style={[styles.post, { backgroundColor: COLORS.VIOLET_PASTEL_FONT }]}
            >
              <View style={styles.firstColumn}>
                <Icon type='font-awesome' name='lightbulb-o' size={40} color={COLORS.VIOLET_PASTEL_TEXT} />
              </View>
              <View style={styles.secondColumn}>
                <Text style={[styles.subtitleP, { color: COLORS.VIOLET_PASTEL_TEXT }]}>Ejemplos</Text>
                <View style={styles.row}>
                  <Text style={[styles.texto, { color: COLORS.VIOLET_PASTEL_TEXT }]}>Ejemplos identificados en el texto que enriquecen el resumen</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}

          <Modal visible={isModalVisible} animationType='fade' transparent>

            <View style={styles.modalContainer}>

              <View style={[styles.modalView, { backgroundColor: COLORS.WHITE }]}>

                <Icon type={selectedPost.type} name={selectedPost.icon} size={40} color={selectedPost.iconColor} style={styles.icon} />

                <Text style={[styles.modalTitle, { color: selectedPost.iconColor }]}>{selectedPost.title}</Text>

                <ScrollView style={styles.modalScrollView}>
                  {selectedPost.info}
                </ScrollView>

                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Text style={[styles.closeButton, { color: selectedPost.iconColor }]}>Cerrar</Text>
                </TouchableOpacity>

              </View>

            </View>

          </Modal>
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
  containerPath: {
    marginBottom: 5
  },
  contentContainer: {
    marginTop: 7,
    marginHorizontal: 25
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: '4%',
    color: COLORS.GRAY_SOFT
  },
  resumen: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify'
  },
  post: {
    flexDirection: 'row',
    marginTop: '5%',
    backgroundColor: COLORS.ORANGE_PASTEL_FONT,
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
    flexDirection: 'row'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalView: {
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    width: '90%',
    maxHeight: '90%'
  },
  modalScrollView: {
    width: '100%'
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  iconContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 40,
    padding: 10,
    marginBottom: 20,
    shadowColor: COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  closeButton: {
    fontSize: 16,
    color: COLORS.GRAY_SOFT,
    marginTop: 10,
    fontWeight: 'bold'
  }
})
