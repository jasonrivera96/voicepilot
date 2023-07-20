import React, { useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
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
    console.log(response)
  }

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      return
    }

    setRecentSearches([{ query: searchQuery, id: Date.now() }, ...recentSearches])
    setSearchQuery('')

    searchQueryTest()
  }

  const clearSearchInput = () => {
    setSearchQuery('')
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
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>

          <FontAwesome name='search' size={18} color={searchQuery === '' ? COLORS.GRAY_EXTRA_SOFT : COLORS.ORANGE} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchResultsContainer}>
        <Text style={styles.searchResultsTitle}>Resultados</Text>
        {searchQuery === ''
          ? (
            <Text style={styles.noResultsText}>Ingrese una búsqueda</Text>
            )
          : results.length === 0
            ? (
              <Text style={styles.noResultsText}>No hay resultados</Text>)
            : (
              <FlatList
                data={results}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                  if (item.type == 'folder') {
                    return (
                      <TouchableOpacity
                        style={styles.searchResultContainer}
                        onPress={() => navigation.navigate(summaryScreenName, {
                          folderId: item.folderId,
                          folderName: item.nombre
                        })}
                      >
                        <View style={styles.resultTextContainer}>

                          <Ionicons name='folder-open-outline' size={16} color={COLORS.GRAY_EXTRA_SOFT} style={styles.resultIcon} />
                          <Text style={styles.searchResultText}>{item.nombre.length > 85 ? item.nombre.substring(0, 85) + '...' : item.nombre}</Text>
                        </View>
                        <Text style={styles.searchResultType}>
                          <View style={styles.secondary1}>
                            <Text style={styles.estado1}>Carpeta</Text>
                          </View>
                        </Text>
                      </TouchableOpacity>
                    )
                  } else if (item.type == 'summary') {
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
                          <Ionicons name='file-tray-full-outline' size={16} color={COLORS.GRAY_EXTRA_SOFT} style={styles.resultIcon} />
                          <Text style={styles.searchResultText}>{item.titulo.length > 85 ? item.titulo.substring(0, 85) + '...' : item.titulo}</Text>
                        </View>
                        <Text style={styles.searchResultType}>
                          <View style={styles.secondary}>
                            <Text style={styles.estado}>Resumen</Text>
                          </View>
                        </Text>
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
    backgroundColor: 'white',
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
    padding: 10,
    borderRadius: 50,
    marginLeft: 10
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
    fontSize: 12
  },

  searchResultContainer: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: '5%',
    borderRadius: 8,
    marginBottom: 10,
    width: '100%'
  },
  resultTextContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  resultIcon: {
    marginRight: 10,
    borderWidth: 1,
    padding: 10,
    borderColor: COLORS.GRAY,

    borderRadius: 20

  },
  searchResultText: {
    width: '70%',
    fontSize: 16
  },
  searchResultType: {
    marginLeft: 'auto',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    paddingHorizontal: 10
  },
  secondary: {
    height: 25,
    width: 100,
    padding: '5%',
    borderRadius: 15,
    backgroundColor: COLORS.GREEN_SOFT
  },
  estado: {
    width: '100%',
    color: COLORS.GREEN,
    textAlign: 'center'
  },
  secondary1: {
    height: 25,
    width: 100,

    padding: '5%',
    borderRadius: 15,
    backgroundColor: '#FFF9E9FF'
  },
  estado1: {
    width: '100%',
    color: '#876500FF',
    textAlign: 'center',
    textAlign: 'center'
  }
})
