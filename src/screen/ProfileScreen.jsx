import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity, Dimensions } from 'react-native'
import Constants from 'expo-constants'
import { COLORS, personalInforScreenName } from '../constants'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')
const statusBarHeight = Constants.statusBarHeight

const ProfileScreen = () => {
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true)
  const [fontSize, setFontSize] = useState(16)
  const navigation = useNavigation()

  const toggleDarkMode = () => {
    setIsDarkModeEnabled((prev) => !prev)
  }

  const increaseFontSize = () => {
    setFontSize((prevSize) => prevSize + 1)
  }

  const decreaseFontSize = () => {
    setFontSize((prevSize) => prevSize - 1)
  }

  return (
    <View style={styles.container}>
      <StatusBar style='dark' backgroundColor='white' />
      <View style={styles.contentContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>
        </View>

        {/* ACCOUNT */}
        <Text style={styles.tit}>Cuenta</Text>
        <TouchableOpacity style={styles.izq} onPress={() => navigation.navigate(personalInforScreenName)}>
          <View style={styles.account}>
            <View style={styles.square}>
              <Ionicons name='person-outline' size={20} color={COLORS.ORANGE} />
            </View>
            <Text style={styles.texto}>Información Personal</Text>
            <View style={styles.flecha}>
              <Ionicons name='chevron-forward-outline' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.line} />

        {/* APPEARANCE */}
        <Text style={styles.tit}>Apariencia</Text>
        <View style={styles.account}>
          <View style={styles.squareA}>
            <Ionicons name='moon-outline' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
          </View>
          <Text style={styles.texto}>Modo Noche</Text>
          <View style={styles.flecha}>
            <Switch value={isDarkModeEnabled} onValueChange={toggleDarkMode} />
          </View>
        </View>
        <View style={styles.account}>
          <View style={styles.squareA}>
            <Ionicons name='text' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
          </View>
          <Text style={styles.texto}>Tamaño de letra</Text>
          <View style={styles.flecha1}>
            <TouchableOpacity onPress={decreaseFontSize}>
              <Ionicons name='remove' size={15} color='black' />
            </TouchableOpacity>
            <Text style={styles.fontSizeText}>{fontSize}</Text>
            <TouchableOpacity onPress={increaseFontSize}>
              <Ionicons name='add' size={15} color='black' />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.line} />

        <Text style={styles.tit}>Otras Configuraciones</Text>
        <TouchableOpacity style={styles.izq}>
          <View style={styles.account}>
            <View style={styles.squareB}>
              <Ionicons name='lock-closed-outline' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
            </View>
            <Text style={styles.texto}>Seguridad</Text>
            <View style={styles.flecha}>
              <Ionicons name='chevron-forward-outline' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.izq}>
          <View style={styles.account}>
            <View style={styles.squareB}>
              <Ionicons name='shield-checkmark-outline' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
            </View>
            <Text style={styles.texto}>Privacidad</Text>
            <Ionicons name='alert-circle-outline' size={20} color={COLORS.ORANGE} style={styles.prueba} />
            <View style={styles.flecha}>
              <Ionicons name='chevron-forward-outline' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.izq}>
          <View style={styles.account}>
            <View style={styles.squareB}>
              <Ionicons name='notifications-outline' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
            </View>
            <Text style={styles.texto}>Notificaciones</Text>
            <View style={styles.flecha}>
              <Ionicons name='chevron-forward-outline' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.izq}>
          <View style={styles.account}>
            <View style={styles.squareB}>
              <Ionicons name='help-circle-outline' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
            </View>
            <Text style={styles.texto}>Ayuda y Soporte</Text>
            <View style={styles.flecha}>
              <Ionicons name='chevron-forward-outline' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.izq}>
          <View style={styles.account}>
            <View style={styles.squareB}>
              <Ionicons name='chatbox-ellipses-outline' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
            </View>
            <Text style={styles.texto}>Realimentación</Text>
            <View style={styles.flecha}>
              <Ionicons name='chevron-forward-outline' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
            </View>
          </View>
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    paddingTop: statusBarHeight,
    alignItems: 'center'
  },
  contentContainer: {
    width: '90%'
  },
  section: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 20
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80
  },
  account: {
    flexDirection: 'row',
    alignSelf: 'flex-start'
    // marginLeft: '7%'
  },
  tit: {
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.GRAY_EXTRA_SOFT,
    marginTop: '4%',
    alignSelf: 'flex-start'
  },
  square: {
    marginTop: '4%',
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: COLORS.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  texto: {
    padding: 20,
    color: COLORS.GRAY_SOFT
  },

  flecha1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 2,
    paddingTop: 20,
    marginLeft: '80%'
  },
  flecha2: {
    flexDirection: 'row'
  },
  line: {
    width: width * 0.9,
    height: 2,
    backgroundColor: COLORS.GRAY,
    borderRadius: 2,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  squareA: {
    marginTop: '4%',
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: COLORS.GRAY_EXTRA_SOFT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  prueba: {
    position: 'absolute',
    paddingTop: 20,
    marginLeft: '80%',
    zIndex: 2
  },
  squareB: {
    marginTop: '4%',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: COLORS.GRAY
  },
  izq: {
    alignSelf: 'flex-start'
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  optionLabel: {
    fontSize: 16
  },
  fontSizeContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  fontSizeText: {
    fontSize: 16,
    marginHorizontal: 8
  },
  flecha: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20
  }
})
