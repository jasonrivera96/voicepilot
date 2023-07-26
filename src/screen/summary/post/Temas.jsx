import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { COLORS } from '../../../constants'

const Temas = ({ data }) => {
  return (
    <>
      {data?.map((temas, index) => (
        <View key={index} style={styles.temasContainer}>
          <Text style={styles.tit}>{temas.tem}</Text>
          <Text style={styles.detalle}>{temas.def}</Text>
        </View>
      ))}
    </>
  )
}

export default Temas

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
