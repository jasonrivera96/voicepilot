import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { COLORS } from '../../../constants'
import { ScrollView } from 'react-native'

const Palabras = ({ data }) => {
  return (
    <>
    {data?.map((palabras) => (
         
<View style={styles.palabrasContainer}>
    
        <Text style={styles.bulletPoint}>•</Text>
          <Text style={styles.tit}>{palabras}</Text>
          
        </View>
      
        ))}
        </>
  )
}

export default Palabras

const styles = StyleSheet.create({
  tit: {
    fontSize: 13,
    lineHeight:12,
    textAlign: 'justify',
    color: COLORS.GRAY_EXTRA_SOFT,
    flexShrink: 1,
  },
  palabrasContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 13,
    lineHeight: 12,
    textAlign: 'justify',
    color: COLORS.GRAY_EXTRA_SOFT,
    marginRight: 5, // Espacio entre la viñeta y el texto
  },
 
})
