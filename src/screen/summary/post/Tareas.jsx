import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { COLORS } from '../../../constants'

const Tareas = ({ data }) => {
  return (
    <>
      {data?.map((tareas, index) => (
        <View key={index} style={styles.tareasContainer}>
          <Text style={styles.tit}>{tareas.fecha}</Text>
          <Text style={styles.detalle}>{tareas.des}</Text>
        </View>
      ))}
    </>
  )
}

export default Tareas

const styles = StyleSheet.create({
  tit: {
    textAlign: 'justify',
    color: COLORS.GRAY_SOFT,
    fontWeight: 'bold',
    fontSize: 16
  },
  detalle: {
    textAlign: 'justify',
    color: COLORS.GRAY_SOFT,
    marginBottom: 10
  }
})
