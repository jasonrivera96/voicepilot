import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

import { COLORS } from '../constants'

const arrowForwardIcon = (
  <MaterialIcons
    name='arrow-forward-ios' size={14} color='black' style={{ marginHorizontal: 5 }}
  />
)

const NavigatorPath = ({ route }) => {
  let { folderName, summaryName } = route.params
  if (folderName.length > 40) folderName = folderName.substring(0, 40) + '...'
  if (summaryName?.length > 16) {
    summaryName = summaryName.substring(0, 16) + '...'
    if (folderName.length > 16) folderName = folderName.substring(0, 16) + '...'
  }
  return (
    <View style={styles.containerPath}>
      <Text style={styles.textPath}>Portafolio</Text>
      {arrowForwardIcon}
      <Text style={styles.textPath}>{folderName}</Text>
      {summaryName && arrowForwardIcon}
      {summaryName && <Text style={styles.textPath}>{summaryName}</Text>}
    </View>
  )
}

export default NavigatorPath

const styles = StyleSheet.create({
  containerPath: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20
  },
  textPath: {
    color: COLORS.ORANGE
  }
})
