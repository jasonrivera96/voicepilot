import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity, Dimensions } from 'react-native'
import Constants from 'expo-constants'
import { COLORS, personalInforScreenName } from '../constants'
import { Ionicons } from '@expo/vector-icons'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/native'

const { width } = Dimensions.get('window')
const statusBarHeight = Constants.statusBarHeight

const CustomIcon = ({ name, size = 20, color, type }) => {
  const colors = color || COLORS.GRAY_EXTRA_SOFT
  const filled = type === 'filled' ? { borderWidth: 0, backgroundColor: COLORS.GRAY, padding: 10 } : null
  return (
    <View style={[styles.optionIcon, { borderColor: colors }, filled]}>
      <Ionicons name={name} size={size} color={colors} />
    </View>
  )
}

const OptionRow = ({ icon, onPress, typeIcon, colorIcon, children, rightIcon, disableIcon = false, style, ...restProps }) => {
  const customRightIcon = rightIcon || <Ionicons name='chevron-forward-outline' size={20} color={COLORS.GRAY_EXTRA_SOFT} />
  return (
    <TouchableOpacity
      style={{
        ...styles.containerOption,
        ...style
      }}
      onPress={onPress}
      disabled={disableIcon}
      {...restProps}
    >
      <CustomIcon name={icon} type={typeIcon} color={colorIcon} />
      <Text style={styles.optionText}>{children}</Text>
      <View style={[styles.optionRowIcon]}>
        {customRightIcon}
      </View>
    </TouchableOpacity>
  )
}

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
        <Text style={styles.titulo}>Cuenta</Text>

        <OptionRow
          icon='person-outline'
          colorIcon={COLORS.ORANGE}
          onPress={() => navigation.navigate(personalInforScreenName)}
        >
          Información Personal
        </OptionRow>

        <View style={styles.separator} />

        {/* APPEARANCE */}
        <Text style={styles.titulo}>Apariencia</Text>

        <OptionRow
          icon='moon-outline'
          rightIcon={<Switch value={isDarkModeEnabled} onValueChange={toggleDarkMode} />}
          disableIcon
        >
          Modo noche
        </OptionRow>
        <OptionRow
          icon='text'
          rightIcon={
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <TouchableOpacity onPress={decreaseFontSize} style={{ padding: 5 }}>
                <Ionicons name='remove' size={15} color='black' />
              </TouchableOpacity>
              <Text style={styles.fontSizeText}>{fontSize}</Text>
              <TouchableOpacity onPress={increaseFontSize} style={{ padding: 5 }}>
                <Ionicons name='add' size={15} color='black' />
              </TouchableOpacity>
            </View>
          }
          disableIcon
        >
          Tamaño de letra
        </OptionRow>

        <View style={styles.separator} />

        {/* OTHERS */}
        <Text style={styles.titulo}>Otras Configuraciones</Text>

        <OptionRow icon='lock-closed-outline' typeIcon='filled'>Seguridad</OptionRow>
        <OptionRow icon='shield-checkmark-outline' typeIcon='filled'>Privacidad</OptionRow>
        <OptionRow icon='notifications-outline' typeIcon='filled'>Notificaciones</OptionRow>
        <OptionRow icon='help-circle-outline' typeIcon='filled'>Ayuda y Soporte</OptionRow>
        <OptionRow icon='chatbox-ellipses-outline' typeIcon='filled'>Realimentación</OptionRow>

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
  containerOption: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  optionIcon: {
    borderWidth: 2,
    borderColor: COLORS.ORANGE,
    borderRadius: 5,
    padding: 8
  },
  optionText: {
    flex: 1,
    marginLeft: 20
  },
  optionRowIcon: {
    paddingHorizontal: 20,
    flexDirection: 'row',
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
  titulo: {
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.GRAY_EXTRA_SOFT,
    marginTop: '4%',
    alignSelf: 'flex-start'
  },
  separator: {
    width: width * 0.9,
    height: 2,
    backgroundColor: COLORS.GRAY,
    borderRadius: 2,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  fontSizeText: {
    marginHorizontal: 8
  }
})
