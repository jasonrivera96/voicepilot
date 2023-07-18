import React, { useCallback, useContext, useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { COLORS, summaryScreenName } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { AuthContext } from '../context/AuthContext'
import { loadFolders } from '../services/FolderService'
import { getSummary } from '../services/SummaryService'
import { useNavigation } from '@react-navigation/native'

export default function SearchScreen({ item }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [recentSearches, setRecentSearches] = useState([])
  const [folders, setFolders] = useState([])
  const [summaries, setSummaries] = useState([])
  const { userData } = useContext(AuthContext)
  const navigation = useNavigation()
  

  const fetchData = useCallback(async () => {
    try {
      const response = await loadFolders(userData)
      setFolders(response)
    } catch (error) {
      console.error('Error al obtener las carpetas:', error.message)
    }
  }, [userData])

  const fetchSummaries = useCallback(async () => {
    try {
      const response = await getSummary(userData)
      setSummaries(response)
    } catch (error) {
      console.error('Error al obtener los resúmenes:', error.message)
    }
  }, [userData])

  useEffect(() => {
    fetchData()
    fetchSummaries()
  }, [fetchData, fetchSummaries])

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      return
    }

    const filteredFolders = folders.filter(folder =>
      folder.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const filteredSummaries = summaries.filter(summary =>
      summary.name.toLowerCase().includes(searchQuery.toLowerCase())
    )

    setRecentSearches([{ query: searchQuery, id: Date.now() }, ...recentSearches])
    setSearchQuery('')
  }

  const renderSearchResult = ({ item, isFolder }) => (
    <TouchableOpacity
      key={item.id}
      style={styles.searchResultContainer}
      onPress={() =>
        navigation.navigate(summaryScreenName, { folderId: item.id, folderName: item.name })
      }
    >
      <View style={styles.resultTextContainer}>
        {isFolder ? (
          <FontAwesome name='folder-o' size={16} color={COLORS.GRAY_EXTRA_SOFT} style={styles.resultIcon} />
        ) : (
          <FontAwesome name='file-text-o' size={16} color={COLORS.GRAY_EXTRA_SOFT} style={styles.resultIcon} />
        )}
        <Text style={styles.searchResultText}>
          {item.name.length > 85 ? item.name.substring(0, 85) + '...' : item.name}
        </Text>
      </View>
      <Text style={styles.searchResultType}>
        {isFolder ? (
          <View style={styles.secondary}>
            <Text style={styles.estado}>Carpeta</Text>
          </View>
        ) : (
          <View style={styles.secondary1}>
            <Text style={styles.estado1}>Resumen</Text>
          </View>
        )}
      </Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />
      <Text style={styles.title}>Buscar</Text>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder='Ingrese su búsqueda'
          onChangeText={text => setSearchQuery(text)}
          value={searchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <FontAwesome name='search' size={18} color={COLORS.ORANGE} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchResultsContainer}>
        <Text style={styles.searchResultsTitle}>Resultados de la Búsqueda</Text>
        <FlatList
          data={folders.filter(folder => folder.name.toLowerCase().includes(searchQuery.toLowerCase()))}
          renderItem={({ item }) => renderSearchResult({ item, isFolder: true })}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.searchResultsList}
        />
        <FlatList
          data={summaries.filter(summary => summary.name.toLowerCase().includes(searchQuery.toLowerCase()))}
          renderItem={({ item }) => renderSearchResult({ item, isFolder: false })}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.searchResultsList}
        />
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
    borderColor: COLORS.ORANGE,
    borderRadius: 50,
    paddingHorizontal: 10,
    width: '90%',
    marginTop: 40
  },
  searchInput: {
    flex: 1,
    height: 40
  },
  searchButton: {
    backgroundColor: COLORS.WHITE,
    padding: 10,
    borderRadius: 4,
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
  searchResultsList: {
    alignItems: 'flex-start',
    paddingHorizontal: 20
  },
  searchResultContainer: {
    flexDirection: 'row',
    paddingVertical: 7,
    paddingHorizontal: '5%',
    borderRadius: 8,
    backgroundColor: COLORS.GRAY_LIGHT,
    marginBottom: 10,
    width: '95%',
  },
  resultTextContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  resultIcon: {
    marginRight: 10
  },
  searchResultText: {
    fontSize: 16,
  },
  searchResultType: {
    marginLeft: 'auto',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  secondary: {
    width: '20%',
    height: 25,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: COLORS.GREEN_SOFT
  },
  estado: {
    color: COLORS.GREEN
  },
  secondary1: {
    width: '20%',
    height: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#FFF9E9FF'
  },
  estado1: {
    color: '#876500FF'
  }
})
