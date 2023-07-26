import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, summaryItemScreenName, summaryScreenName } from '../constants'
import { useNavigation } from '@react-navigation/native'
import { Icon } from 'react-native-elements'

const emptySearch = {
  titulo: 'No existen búsquedas recientes',
  icon: 'search',
  type: 'oction',
  detail: () => (
    <Text style={stylesEmpty.description}>
      Las búsquedas te permiten encontrar fácilmente tus
      <Text style={stylesEmpty.textLink}> resúmenes </Text>
      y
      <Text style={stylesEmpty.textLink}> carpetas</Text>
      .
    </Text>
  )
}

const notFound = {
  titulo: 'Sin resultados',
  icon: 'search-off',
  type: 'material-icon',
  detail: () => (
    <Text style={stylesEmpty.description}>
      No hemos podido encontrar
      <Text style={stylesEmpty.textLink}> resúmenes </Text>
      o
      <Text style={stylesEmpty.textLink}> carpetas </Text>
      con ese término. Verifica que esté bien escrito o intenta con otro término.
    </Text>
  )
}

const QueryResultEmpty = ({ searchQuery }) => {
  const message = searchQuery.trim() === '' ? emptySearch : notFound
  return (
    <View style={stylesEmpty.container}>
      <View style={stylesEmpty.iconEmpty}>
        <Icon type={message.type} name={message.icon} size={50} />
      </View>
      <Text style={stylesEmpty.message}>{message.titulo}</Text>
      {message.detail && message.detail()}
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

const stylesEmpty = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center'
  },
  iconEmpty: {
    backgroundColor: COLORS.GRAY,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
    width: 128,
    height: 128,
    borderRadius: 64
  },
  message: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 30
  },
  description: {
    fontSize: 14,
    marginHorizontal: 40,
    textAlign: 'center',
    marginTop: 10,
    color: COLORS.GRAY_EXTRA_SOFT
  },
  containerButton: {
    backgroundColor: COLORS.ORANGE,
    flexDirection: 'row',
    paddingHorizontal: 20,
    width: 152,
    height: 44,
    borderRadius: 8,
    opacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
    shadowColor: COLORS.ORANGE,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10
  },
  textButton: {
    color: COLORS.WHITE
  },
  textLink: {
    color: COLORS.ORANGE
  }
})
