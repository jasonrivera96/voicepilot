import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

import { COLORS } from '../../constants'

const addIcon = <Ionicons name='add' size={30} color='white' />

const Header = ({ openModal, data }) => {
  return (
    <View style={styles.contentContainer}>
      {data && data.length
        ? (
          <TouchableOpacity onPress={openModal} style={styles.addIcon}>
            <Text>{addIcon}</Text>
          </TouchableOpacity>
          )
        : (<View />)}
      <View style={styles.text}>
        <Text style={styles.titlePage}>Portafolio</Text>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 80
  },
  addIcon: {
    backgroundColor: COLORS.ORANGE,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    position: 'absolute',
    left: -28
  },
  text: {
    width: '70%'
  },
  titlePage: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }

})
