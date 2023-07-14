import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import { COLORS } from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext'

const ProfileScreen = () => {

  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [fontSize, setFontSize] = useState(16);

  const toggleDarkMode = () => {
    setIsDarkModeEnabled((prev) => !prev);
  };

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 1);
  };

  const decreaseFontSize = () => {
    setFontSize((prevSize) => prevSize - 1);
  };

  const { logout } = useContext(AuthContext)

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuración</Text>
      </View>
      <TouchableOpacity>


        <View style={styles.grupo}>
          <Text style={styles.tit}>Cuenta</Text>
          <View style={styles.account}>
            <View style={styles.square}>
              <Ionicons name="person-outline" size={20} color={COLORS.ORANGE} />
            </View>
            <Text style={styles.texto}>Información Personal</Text>
            <View style={styles.flecha}>
              <Ionicons name="chevron-forward-outline" size={20} color={COLORS.ORANGE} />
            </View>
          </View>
        
        </View>
      </TouchableOpacity>


      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Apariencia</Text>
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Modo Noche</Text>
          <Switch value={isDarkModeEnabled} onValueChange={toggleDarkMode} />
        </View>
        <View style={styles.option}>
          <Text style={styles.optionLabel}>Tamaño de la Letra</Text>
          <View style={styles.fontSizeContainer}>
            <TouchableOpacity onPress={decreaseFontSize}>
              <Ionicons name="remove" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.fontSizeText}>{fontSize}</Text>
            <TouchableOpacity onPress={increaseFontSize}>
              <Ionicons name="add" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuraciones Generales</Text>
        {/* Aquí puedes agregar tus otras configuraciones generales */}
        {/* Por ejemplo: Seguridad, privacidad, notificaciones, etc. */}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ayuda y Soporte</Text>
        {/* Aquí puedes agregar opciones de ayuda y soporte */}
      </View>
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

  section: {
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50
  },
  account: {
    flexDirection: 'row',

  },
  grupo: {
    marginLeft: "5%"
  },
  tit: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.GRAY_EXTRA_SOFT,
  },
  square: {
    marginTop: "2%",
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: COLORS.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,

  },
  texto: {
    padding: 15,
    color: COLORS.GRAY_SOFT
  },


  flecha:{
    padding: 15,
    marginLeft: 100

  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  optionLabel: {
    fontSize: 16,
  },
  fontSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSizeText: {
    fontSize: 16,
    marginHorizontal: 8,
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
  },
})


export default ProfileScreen
