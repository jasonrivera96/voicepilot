import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import { COLORS } from '../constants'
import { AuthContext } from '../context/AuthContext'

const ProfileScreen = () => {
  const { logout } = useContext(AuthContext)
  return (
    <View style={styles.container}>

      <View style={styles.body}>
        <Text style={styles.description}>User's profile screen.</Text>
        <TouchableOpacity onPress={() => logout()} style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  },
  logoutButton: {
    backgroundColor: COLORS.ORANGE,
    width: '90%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: COLORS.ORANGE,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16
  }
})

export default ProfileScreen
