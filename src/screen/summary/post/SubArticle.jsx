import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { COLORS } from '../../../constants'

const SubArticle = ({ data }) => {
  return (
    data?.map((subArticulo) => (
      <View key={subArticulo.id}>
        <Text style={styles.subtitle}>{subArticulo.subTitle}</Text>
        <Text style={styles.resumen}>{subArticulo.content}</Text>
      </View>
    ))
  )
}

export default SubArticle

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.GRAY_SOFT,
    marginTop: '5%',
    marginBottom: '2%'
  },
  resumen: {
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'justify'
  }
})
