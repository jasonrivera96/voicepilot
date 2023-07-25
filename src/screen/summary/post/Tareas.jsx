import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { COLORS } from '../../../constants'

const Tareas = ({ data }) => {
  return (
    <>
    {data?.map((tareas) => (
      <View  style={styles.tareasContainer}>
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
