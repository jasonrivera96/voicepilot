import React, { useCallback, useContext, useEffect, useState } from 'react'
import { StyleSheet, Text, View, ScrollView, Modal, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { COLORS } from '../../constants'
import NavigatorPath from '../../components/NavigatorPath'
import { getSummary } from '../../services/SummaryService'
import { AuthContext } from '../../context/AuthContext'
import { StatusBar } from 'expo-status-bar'
import { FontAwesome } from '@expo/vector-icons'
import SubArticle from './post/SubArticle'
import Fechas from './post/Fechas'
import Palabras from './post/Palabras'
import Temas from './post/Temas'
import Preguntas from './post/Preguntas'
import Tareas from './post/Tareas'

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
    iconColor: COLORS.Pastel_Mint_Green_1,
    info: null
  })
  const handleOpenModal = (title, color, icon, iconColor, info) => {
    setSelectedPost({ title, color, icon, iconColor, info })

    setIsModalVisible(true)
  }

  const { titulo, resumen, subArticuloList, palabras, temas, fechas, preguntas, tareas } = summary

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
            <Text style={styles.resumen}>{resumen}</Text>
            <SubArticle data={subArticuloList} />
          </View>

          <Text style={[styles.title, { fontSize: 16 }]}>Información Clave</Text>

          {/* Palabras */}
          <TouchableOpacity onPress={() => handleOpenModal('Palabras Clave', COLORS.Pastel_Mint_Green, 'text-height', COLORS.Pastel_Mint_Green_1, <Palabras data={palabras} />)} style={[styles.post, { backgroundColor: COLORS.Pastel_Mint_Green }]}>
            <View style={styles.firstColumn}>
              <FontAwesome name='text-height' size={40} color={COLORS.Pastel_Mint_Green_1} />
            </View>
            <View style={styles.secondColumn}>
              <Text style={[styles.subtitleP, { color: COLORS.Pastel_Mint_Green_1 }]}>Palabras Clave</Text>
              <View style={styles.row}>
                <Text style={styles.texto}>Palabras importantes encontradas en el audio analizado</Text>
              </View>
            </View>
          </TouchableOpacity>
          {/* TEMAS */}
          <TouchableOpacity
            onPress={() => handleOpenModal('Temas Destacados', COLORS.GRAY, 'folder-open-o', COLORS.GRAY_SOFT, <Temas data={temas} />)}
            style={[styles.post, { backgroundColor: COLORS.GRAY }]}
          >
            <View style={styles.firstColumn}>
              <FontAwesome name='folder-open-o' size={40} color={COLORS.GRAY_SOFT} />
            </View>
            <View style={styles.secondColumn}>
              <Text style={[styles.subtitleP, { color: COLORS.GRAY_SOFT }]}>Temas Destacados</Text>
              <View style={styles.row}>
                <Text style={styles.texto}>Temas con mayor relevancia mencionados en el audio</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* FECHAS  */}

          <TouchableOpacity
            onPress={() => handleOpenModal('Fechas Importantes', COLORS.Pastel_Orange_1, 'calendar-o', COLORS.Pastel_Orange_1, <Fechas data={fechas} />)}
            style={[styles.post, { backgroundColor: COLORS.Pastel_Orange }]}
          >
            <View style={styles.firstColumn}>
              <FontAwesome name='calendar-o' size={40} color={COLORS.Pastel_Orange_1} />
            </View>
            <View style={styles.secondColumn}>
              <Text style={[styles.subtitleP, { color: COLORS.Pastel_Orange_1 }]}>Fechas Importantes</Text>
              <View style={styles.row}>
                <Text style={styles.texto}>Fechas consideradas clave en el desarrollo del audio</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Preguntas */}
          <TouchableOpacity
            onPress={() => handleOpenModal('Preguntas', COLORS.Pastel_Pink, 'question', COLORS.Pastel_Pink_1, <Preguntas data={preguntas} />)}
            style={[styles.post, { backgroundColor: COLORS.Pastel_Pink }]}
          >
            <View style={styles.firstColumn}>
              <FontAwesome name='question' size={40} color={COLORS.Pastel_Pink_1} />
            </View>
            <View style={styles.secondColumn}>
              <Text style={[styles.subtitleP, { color: COLORS.Pastel_Pink_1 }]}>Preguntas</Text>
              <View style={styles.row}>
                <Text style={styles.texto}>Preguntas de apoyo para complementar la información recopilada</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Tareas */}
          <TouchableOpacity
            onPress={() => handleOpenModal('Tareas', COLORS.Pastel_Blue, 'tasks', COLORS.Pastel_Blue_1, <Tareas data={tareas} />)}
            style={[styles.post, { backgroundColor: COLORS.Pastel_Blue }]}
          >
            <View style={styles.firstColumn}>
              <FontAwesome name='tasks' size={40} color={COLORS.Pastel_Blue_1} />
            </View>
            <View style={styles.secondColumn}>
              <Text style={[styles.subtitleP, { color: COLORS.Pastel_Blue_1 }]}>Tareas</Text>
              <View style={styles.row}>
                <Text style={styles.texto}>Tareas programadas durante la reproducción del audio</Text>
              </View>
            </View>
          </TouchableOpacity>
          <Modal visible={isModalVisible} animationType='fade' transparent>
            <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
              <View style={styles.modalContainer}>
                <View style={[styles.modalView, { backgroundColor: COLORS.WHITE }]}>

                  <FontAwesome name={selectedPost.icon} size={40} color={selectedPost.iconColor} style={styles.icon} />

                  <Text style={[styles.modalTitle, { color: selectedPost.iconColor }]}>{selectedPost.title}</Text>
                  {/* Resto del contenido del modal */}
                  <ScrollView style={styles.modalScrollView}>
                    {selectedPost.info}
                  </ScrollView>

                  <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                    <Text style={styles.closeButton}>Cerrar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
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
    marginTop: '8%',
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
    width: '80%',
    maxHeight: '80%'
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
    color: COLORS.GRAY_EXTRA_SOFT,
    marginTop: 10,
    fontWeight: 'bold'
  }
})
