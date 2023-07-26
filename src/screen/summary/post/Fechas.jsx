import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { COLORS } from '../../../constants'

const Fechas = ({ data }) => {
  return (
    <>
      {data?.map((fechas, index) => (
        <View key={index} style={styles.fechasContainer}>
          <Text style={styles.tit}>{fechas.fec}</Text>
          <Text style={styles.detalle}>{fechas.det}</Text>
        </View>
      ))}
    </>
  )
}

export default Fechas

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
