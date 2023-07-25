import React from 'react'
import { Text, View, StyleSheet } from 'react-native'

import { COLORS } from '../../../constants'
import { ScrollView } from 'react-native'

const Preguntas = ({ data }) => {
    return (
      
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {data?.map((preguntas) => (

                <View style={styles.preguntasContainer}>

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
        paddingBottom: 10, 
      },
    tit: {
        fontSize: 13,
        lineHeight: 12,
        textAlign: 'justify',
        color: COLORS.GRAY_EXTRA_SOFT,
        flexShrink: 1,
    },
    preguntasContainer: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    bulletPoint: {
        fontSize: 13,
        lineHeight: 18,
        textAlign: 'justify',
        color: COLORS.GRAY_EXTRA_SOFT,
        marginRight: 5, 
    },

})
