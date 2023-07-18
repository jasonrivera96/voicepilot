import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import Constants from 'expo-constants'

import { COLORS } from '../constants'
import { StatusBar } from 'expo-status-bar'

export default function SearchScreen () {
  const [searchQuery, setSearchQuery] = useState('')
  // busquedas recientes
  const [recentSearches, setRecentSearches] = useState([])
  // AGREGAR VARIABLES DE RESULTADOS DE BUSQUEDA

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      return
    }

    // Agrega la búsqueda actual al inicio del array de búsquedas recientes
    setRecentSearches([{ query: searchQuery, id: Date.now() }, ...recentSearches])
    setSearchQuery('')
  }

  const handleRecentSearchSelect = (query) => {
    setSearchQuery(query)
    handleSearch()
  }

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
      <View style={styles.recentSearchesContainer}>
        {/* SOLO TRABAJAN EN LOCAL */}
        <Text style={styles.recentSearchesTitle}>Búsquedas Recientes</Text>
        <FlatList
          data={recentSearches}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.recentSearchContainer}
              onPress={() => handleRecentSearchSelect(item.query)}
            >
              <FontAwesome name='search' size={16} color='#888' style={styles.recentSearchIcon} />
              <Text style={styles.recentSearchText}>{item.query}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.recentSearchesList}
        />
      </View>
      {/* AGREGAR RESULTADOS DE LA BUSQUEDA */}
      {/* DAR FUNCIONALIDAD PARA QUE AL SELECCIONAR UN RESULTADO SE CAMBIE DE PANTALLA */}
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
  recentSearchesContainer: {
    alignSelf: 'flex-start',

    marginTop: 20
  },
  recentSearchesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginLeft: 20
  },
  recentSearchesList: {

    alignItems: 'flex-start'
  },

  recentSearchContainer: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  recentSearchIcon: {
    marginRight: 5
  },
  recentSearchText: {
    fontSize: 16
  }

})
