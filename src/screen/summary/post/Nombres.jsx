import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { COLORS } from '../../../constants'

const Nombres = ({ data }) => {
  return (
    <>
      {data?.map((nombres, index) => (
        <View key={index} style={styles.palabrasContainer}>
          <Text style={styles.bulletPoint}>{index + 1}. </Text>
          <Text style={styles.tit}>{nombres}</Text>
        </View>
      ))}
    </>
  )
}

export default Nombres

const styles = StyleSheet.create({
  tit: {
    lineHeight: 14,
    textAlign: 'justify',
    color: COLORS.GRAY_SOFT
  },
  palabrasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  bulletPoint: {
    textAlign: 'justify',
    color: COLORS.GRAY_SOFT,
    marginRight: 5,
    fontWeight: 'bold'
  }
})
