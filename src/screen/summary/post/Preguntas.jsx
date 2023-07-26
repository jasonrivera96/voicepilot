import React from 'react'
import { Text, View, StyleSheet, ScrollView } from 'react-native'

import { COLORS } from '../../../constants'

const Preguntas = ({ data }) => {
  return (

    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      {data?.map((preguntas, index) => (
        <View key={index} style={styles.preguntasContainer}>
          <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.tit}>{preguntas}</Text>
        </View>
      ))}
    </ScrollView>
  )
}

export default Preguntas

const styles = StyleSheet.create({
  scrollViewContent: {
    paddingBottom: 10
  },
  tit: {
    textAlign: 'justify',
    color: COLORS.GRAY_SOFT,
    width: '95%'
  },
  preguntasContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    alignItems: 'center'
  },
  bulletPoint: {
    textAlign: 'justify',
    fontWeight: 'bold',
    color: COLORS.GRAY_SOFT,
    marginRight: 5
  }

})
