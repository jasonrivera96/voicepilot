import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { COLORS } from '../../../constants'

const Ejemplos = ({ data }) => {
  return (
    <>
      {data?.map((ejemplos, index) => (
        <View key={index} style={styles.tareasContainer}>
          <Text style={styles.tit}>{ejemplos.nom}</Text>
          <Text style={styles.detalle}>{ejemplos.des}</Text>
        </View>
      ))}
    </>
  )
}

export default Ejemplos

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
