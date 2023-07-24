import React, { useCallback, useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import debounce from 'just-debounce-it'

import { COLORS } from '../constants'
import { StatusBar } from 'expo-status-bar'
import { AuthContext } from '../context/AuthContext'
import { useResources } from '../hooks/useResources'
import QueryResult from './QueryResult'

export default function SearchScreen () {
  const [searchQuery, setSearchQuery] = useState('')
  const [focus, setFocus] = useState()
  // const [recentSearches, setRecentSear ches] = useState([])
  // const [results, setResults] = useState([])
  const { userData } = useContext(AuthContext)
  const { resources, loading, getResources, clearResources } = useResources({ searchQuery })

  // async function searchQueryTest () {
  //   const response = await makeQuery(userData, searchQuery)
  //   setResults(response)
  // }

  // const handleSearch = () => {
  //   if (searchQuery.trim() === '') {
  //     return
  //   }
  //   setRecentSearches([{ query: searchQuery, id: Date.now() }, ...recentSearches])
  //   searchQueryTest()
  // }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetResources = useCallback(
    debounce((searchQuery, userData) => {
      getResources({ searchQuery, userData })
    }, 500),
    [getResources]
  )

  const handleChange = (search) => {
    setSearchQuery(search)
    debouncedGetResources(search, userData)
  }

  const handleSubmit = () => {
    getResources({ searchQuery, userData })
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
      <View style={styles.searchResultsContainer}>
        <Text style={styles.searchResultsTitle}>Resultados</Text>
        {loading && <ActivityIndicator size='large' color={COLORS.ORANGE} />}
        {!loading && <QueryResult resources={resources} searchQuery={searchQuery} />}
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
  }
})
