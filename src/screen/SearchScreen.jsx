import React, { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { COLORS, summaryItemScreenName, summaryScreenName } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { AuthContext } from '../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { makeQuery } from '../services/SearchService'

export default function SearchScreen () {
  const [searchQuery, setSearchQuery] = useState('')
  const [focus, setFocus] = useState()
  const [recentSearches, setRecentSearches] = useState([])
  const [results, setResults] = useState([])
  const { userData } = useContext(AuthContext)
  const navigation = useNavigation()

  async function searchQueryTest () {
    const response = await makeQuery(userData, searchQuery)
    setResults(response)
  }

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      return
    }
    setRecentSearches([{ query: searchQuery, id: Date.now() }, ...recentSearches])
    searchQueryTest()
  }

  const clearResults = () => {
    setSearchQuery('')
    setResults([])
  }

  const onFocus = () => {
    setFocus(true)
  }

  const onBlur = () => {
    setFocus(false)
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />
      <Text style={styles.title}>Buscar</Text>
      <View style={[styles.searchContainer, focus ? { borderColor: COLORS.ORANGE } : { borderColor: COLORS.GRAY_EXTRA_SOFT }]}>
        <TextInput
          style={styles.searchInput}
          onFocus={() => onFocus()}
          onBlur={() => onBlur()}
          placeholder='Ingrese su búsqueda'
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
          onSubmitEditing={handleSearch}
          clearButtonMode='while-editing'
        />
        {
          ((results && results.length > 0) || searchQuery !== '') && (
            <TouchableOpacity style={styles.searchButton} onPress={() => clearResults()}>
              <MaterialIcons name='cancel' size={24} color={COLORS.ORANGE} />
            </TouchableOpacity>
          )
        }

      </View>
      <View style={styles.searchResultsContainer}>
        <Text style={styles.searchResultsTitle}>Resultados</Text>
        {results && results.length === 0 && searchQuery !== ''
          ? (
            <Text style={styles.noResultsText}>No se encontró archivos para: {searchQuery}</Text>)
          : (
            <FlatList
              data={results}
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
            )}

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingTop: Constants.statusBarHeight
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 50,
    paddingHorizontal: 10,
    width: '90%',
    marginTop: 40
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 50
  },
  searchButton: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 50
  },
  searchResultsContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 20
  },
  searchResultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20
  },
  noResultsText: {
    marginLeft: 25,
    fontSize: 14
  },

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
  secondary: {
    paddingHorizontal: 15,
    paddingVertical: 2,
    borderRadius: 15,
    backgroundColor: COLORS.GREEN_SOFT,
    justifyContent: 'center',
    alignItems: 'center'
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
  }
})
