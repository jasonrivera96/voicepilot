import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, summaryItemScreenName, summaryScreenName } from '../constants'
import { useNavigation } from '@react-navigation/native'

const QueryResultEmpty = ({ searchQuery }) => {
  const message = searchQuery.trim() === '' ? 'No se ha realizaron búsquedas' : 'No se encontraron resultados'
  return (
    <View>
      <Text style={styles.noResultsText}>{message}</Text>
    </View>
  )
}

const ListQueryResult = ({ resources }) => {
  const navigation = useNavigation()
  return (
    <View style={{ height: '80%' }}>
      <FlatList
        data={resources}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          if (item.type === 'folder') {
            return (
              <TouchableOpacity
                style={styles.searchResultContainer}
                onPress={() => navigation.navigate(summaryScreenName, {
                  folderId: item.folderId,
                  folderName: item.nombre
                })}
              >
                <View style={styles.resultTextContainer}>

                  <Ionicons name='folder-open-outline' size={20} style={styles.resultIcon} />
                  <Text style={styles.searchResultText}>{item.nombre.length > 55 ? item.nombre.substring(0, 55) + '...' : item.nombre}</Text>
                </View>
                <View style={styles.searchResultType}>
                  <Text style={styles.estado1}>Carpeta</Text>
                </View>
              </TouchableOpacity>
            )
          } else if (item.type === 'summary') {
            return (
              <TouchableOpacity
                style={styles.searchResultContainer}
                onPress={() => navigation.navigate(summaryItemScreenName, {
                  folderName: item.folderName,
                  summaryName: item.titulo,
                  summaryId: item.summaryId
                })}
              >
                <View style={styles.resultTextContainer}>
                  <Ionicons name='file-tray-full-outline' size={20} style={styles.resultIcon} />
                  <Text style={styles.searchResultText}>{item.titulo.length > 55 ? item.titulo.substring(0, 55) + '...' : item.titulo}</Text>
                </View>
                <View style={styles.searchResultType}>
                  <Text style={styles.estado}>Resumen</Text>
                </View>
              </TouchableOpacity>
            )
          } else {
            return null
          }
        }}
      />
    </View>
  )
}

const QueryResult = ({ resources, searchQuery }) => {
  const hasData = resources?.length > 0
  return hasData ? <ListQueryResult resources={resources} /> : <QueryResultEmpty searchQuery={searchQuery} />
}

export default QueryResult

const styles = StyleSheet.create({
  searchResultContainer: {
    flexDirection: 'row',
    paddingHorizontal: '5%',
    marginBottom: 10,
    width: '100%'
  },
  resultTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '75%'
  },
  resultIcon: {
    marginRight: 10,
    padding: 10,
    backgroundColor: COLORS.GRAY,
    borderRadius: 20
  },
  searchResultText: {
    width: '80%'
  },
  searchResultType: {
    justifyContent: 'center',
    width: '25%'
  },
  estado: {
    width: '100%',
    color: COLORS.GREEN,
    textAlign: 'center',
    backgroundColor: COLORS.GREEN_SOFT,
    borderRadius: 15,
    paddingVertical: 2
  },
  estado1: {
    width: '100%',
    color: '#876500FF',
    textAlign: 'center',
    backgroundColor: '#FFF9E9FF',
    borderRadius: 15,
    paddingVertical: 2
  },
  noResultsText: {
    marginLeft: 25,
    fontSize: 14
  }
})
