import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { COLORS } from '../../../constants'

const Fechas = ({ data }) => {
  return (
    <>
    {data?.map((fechas) => (
      <View style={styles.fechasContainer}>
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
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.GRAY_SOFT,
    marginTop: '5%',
    marginBottom: '2%',
    flexShrink: 1,
  },
  detalle: {
    fontSize: 13,
    lineHeight:12,
    textAlign: 'justify',
    color: COLORS.GRAY_EXTRA_SOFT,
  }
})
