import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLORS } from '../../constants'
import NavigatorPath from '../../components/NavigatorPath'

const SummaryItemScreen = ({ route }) => {
  return (
    <View style={styles.container}>
      <NavigatorPath route={route} />
      <View style={styles.contentContainer}>
        <Text>SummaryItemScreen</Text>
      </View>
    </View>
  )
}

export default SummaryItemScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE
  },
  contentContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20
  }
})
