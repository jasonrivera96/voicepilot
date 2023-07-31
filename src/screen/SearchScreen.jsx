import React, { useCallback, useContext, useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import debounce from 'just-debounce-it'

import { COLORS } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { AuthContext } from '../context/AuthContext'
import { useQuery } from '../hooks/useQuery'
import QueryResult, { QueryResultEmpty } from './QueryResult'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function SearchScreen () {
  const [searchQuery, setSearchQuery] = useState('')
  const [focus, setFocus] = useState()
  const { userData } = useContext(AuthContext)
  const { resources, loading, getResources, clearResources } = useQuery({ searchQuery })
  const [recentSearches, setRecentSearches] = useState([])
  const [currentSearch, setCurrentSearch] = useState('')
  const RECENT_SEARCHES_KEY = '@MyApp:recentSearches'
  const resourcesArray = resources || []
  const isResourcesEmpty = resourcesArray.length === 0
  const isRecentSearchesEmpty = recentSearches.length === 0

  useEffect(() => {
    if (userData?.id) {
      const getRecentSearchesAsync = async () => {
        try {
          const recentSearchesString = await AsyncStorage.getItem(RECENT_SEARCHES_KEY)
          const recentSearches = recentSearchesString ? JSON.parse(recentSearchesString) : []
          const userRecentSearches = recentSearches.filter((search) => search.userId === userData.id)
          setRecentSearches(userRecentSearches)
        } catch (error) {
          console.error('Error al obtener las búsquedas recientes:', error)
        }
      }
      getRecentSearchesAsync()
    }
  }, [userData, resources])

  const storeRecentSearch = async (userId, query) => {
    try {
      const recentSearchesString = await AsyncStorage.getItem(RECENT_SEARCHES_KEY)
      const recentSearches = recentSearchesString ? JSON.parse(recentSearchesString) : []
      const existingSearch = recentSearches.find(search => search.userId === userId && search.query === query)
      if (existingSearch) return
      const id = Date.now().toString()
      const recentSearch = { id, userId, query }
      recentSearches.push(recentSearch)
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches))
      setRecentSearches(recentSearches)
    } catch (error) {
      console.error('Error al almacenar la búsqueda reciente:', error)
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetResources = useCallback(
    debounce((searchQuery, userData) => {
      getResources({ searchQuery, userData })
    }, 500),
    [getResources]
  )

  const handleChange = (search) => {
    setCurrentSearch(search)
    setSearchQuery(search)
    debouncedGetResources(search, userData)
  }

  const handleSubmit = () => {
    getResources({ searchQuery, userData })
    if (resources.length > 0 && currentSearch !== '') {
      storeRecentSearch(userData?.id, currentSearch)
    }
  }

  const clearResults = () => {
    setSearchQuery('')
    clearResources()
  }

  const onFocus = () => {
    setFocus(true)
  }

  const onBlur = () => {
    setFocus(false)
  }

  const clearAllRecentSearches = async () => {
    try {
      await AsyncStorage.removeItem(RECENT_SEARCHES_KEY)
      setRecentSearches([])
    } catch (error) {
      console.error('Error al borrar las búsquedas recientes:', error)
    }
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
          placeholder='Buscar'
          onChangeText={text => handleChange(text)}
          value={searchQuery}
          onSubmitEditing={handleSubmit}
          clearButtonMode='while-editing'
        />
        {
          ((resources && resources.length > 0) || searchQuery !== '') && (
            <TouchableOpacity style={{ borderWidth: 0 }} onPress={() => clearResults()}>
              <MaterialIcons name='cancel' size={24} color={COLORS.ORANGE} />
            </TouchableOpacity>
          )
        }

      </View>
      {resourcesArray.length === 0 && searchQuery === '' && recentSearches.length > 0 && (
        <View style={styles.recentSearchesContainer}>
          <View style={{ flexDirection: 'row', height: 30, borderBottomWidth: 1, borderColor: COLORS.GRAY, width: '100%', marginBottom: '5%' }}>
            <View style={styles.principal}>
              <Text style={styles.recentSearchesTitle}>Recientes</Text>
            </View>
            <View style={styles.secondary}>
              <TouchableOpacity
                style={styles.clearAllButton}
                onPress={clearAllRecentSearches}
              >
                <Text style={{ color: COLORS.ORANGE }}>Borrar Todo</Text>
              </TouchableOpacity>
            </View>
          </View>
          {recentSearches.length && recentSearches.length > 0 &&
          (
            <FlatList
              data={recentSearches}
              renderItem={({ item }) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => handleChange(item.query)}
                  style={styles.recentSearchItem}
                >
                  <FontAwesome name='undo' size={15} color='black' />
                  <Text style={styles.recentText}>{item.query}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          )}

        </View>
      )}

      {!isResourcesEmpty && (
        <View style={styles.searchResultsContainer}>
          <Text style={styles.searchResultsTitle}>Resultados</Text>
          {loading && <ActivityIndicator size='large' color={COLORS.ORANGE} />}
          {!loading && <QueryResult resources={resources} searchQuery={searchQuery} />}
        </View>
      )}
      {isResourcesEmpty && searchQuery === '' && isRecentSearchesEmpty && (
        <View style={[styles.searchResultsContainer, { flex: 1 }]}>
          <QueryResultEmpty searchQuery={searchQuery} />
        </View>
      )}
      {isResourcesEmpty && searchQuery !== '' && (
        <View style={[styles.searchResultsContainer, { flex: 1 }]}>
          <QueryResultEmpty searchQuery={searchQuery} />
        </View>
      )}

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
    borderWidth: 0,
    borderRadius: 50,
    paddingHorizontal: 10,
    width: '90%',
    marginTop: 40,
    backgroundColor: COLORS.GRAY
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 50,
    backgroundColor: COLORS.GRAY
  },
  searchButton: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 50
  },
  searchResultsContainer: {
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

  recentSearchesContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 20,
    paddingHorizontal: 20,
    position: 'relative'
  },
  principal: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '70%'
  },
  secondary: {
    width: '30%',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  recentSearchesTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingVertical: 5
  },
  recentSearchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 10
  },
  recentText: {
    marginLeft: '2%'

  },
  noRecentSearchesText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10
  },
  clearAllButton: {

    marginLeft: '3%',
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  clearAllButtonText: {
    fontSize: 14,
    color: COLORS.ORANGE,
    marginLeft: '2%'
  }

})
