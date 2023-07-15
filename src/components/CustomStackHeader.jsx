import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

const CustomStackHeader = ({ navigation }) => {
  const handleMenuPress = () => {
    // Acción al presionar el botón del menú
    // Por ejemplo, abrir un menú desplegable o navegar a otra pantalla
    navigation.openDrawer()
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleMenuPress}>
        <Text>Menú</Text>
      </TouchableOpacity>
    </View>
  )
}

export default CustomStackHeader

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red'
  }
})
