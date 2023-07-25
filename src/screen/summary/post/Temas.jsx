import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { COLORS } from '../../../constants'

const Temas = ({ data }) => {
  return (
    <>
    {data?.map((temas) => (
      <View style={styles.temasContainer}>
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
