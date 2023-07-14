import React, { useContext, useState } from 'react'
import { View, Text, StyleSheet, Switch, TouchableOpacity, Dimensions } from 'react-native'
import Constants from 'expo-constants'
import { COLORS } from '../constants'
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext'

const { width } = Dimensions.get('window');
const ProfileScreen = () => {

  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(true);
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


      {/* ACCOUNT */}

      <Text style={styles.tit}>Cuenta</Text>
      <TouchableOpacity style={styles.izq}>
        <View style={styles.account}>
          <View style={styles.square}>
            <Ionicons name="person-outline" size={20} color={COLORS.ORANGE} />
          </View>
          <Text style={styles.texto}>Información Personal</Text>
          <View style={styles.flecha}>
            <Ionicons name="chevron-forward-outline" size={20} color={COLORS.GRAY_EXTRA_SOFT}/>
          </View>
        </View>

      </TouchableOpacity>
      <View style={styles.line} />
      {/* APPEARANCE */}

      <Text style={styles.tit}>Apariencia</Text>
      <View style={styles.account}>
        <View style={styles.squareA}>
          <Ionicons name="moon-outline" size={20} color={COLORS.GRAY_EXTRA_SOFT} />
        </View>
        <Text style={styles.texto}>Modo Noche</Text>
        <View style={styles.flecha}>
          <Switch value={isDarkModeEnabled} onValueChange={toggleDarkMode} />
        </View>


      </View>
      <View style={styles.account}>
        <View style={styles.squareA}>
          <Ionicons name="text" size={20} color={COLORS.GRAY_EXTRA_SOFT} />
        </View>
        <Text style={styles.texto}>Tamaño de letra</Text>
        <View style={styles.flecha1}>
          <TouchableOpacity onPress={decreaseFontSize}>
            <Ionicons name="remove" size={15} color="black" />
          </TouchableOpacity>
          <Text style={styles.fontSizeText}>{fontSize}</Text>
          <TouchableOpacity onPress={increaseFontSize}>
            <Ionicons name="add" size={15} color="black" />
          </TouchableOpacity>
        </View>

      </View>

      <View style={styles.line} />

      <Text style={styles.tit}>Otras Configuraciones</Text>
      <TouchableOpacity style={styles.izq}>
        <View style={styles.account}>
          <View style={styles.squareB}>
            <Ionicons name="lock-closed-outline" size={20} color={COLORS.GRAY_EXTRA_SOFT} />
          </View>
          <Text style={styles.texto}>Seguridad</Text>
          <View style={styles.flecha}>
            <Ionicons name="chevron-forward-outline" size={20} color={COLORS.GRAY_EXTRA_SOFT} />
          </View>
        </View>

      </TouchableOpacity>
      <TouchableOpacity style={styles.izq}>
        <View style={styles.account}>
          <View style={styles.squareB}>
            <Ionicons name="shield-checkmark-outline" size={20} color={COLORS.GRAY_EXTRA_SOFT} />
          </View>
          <Text style={styles.texto}>Privacidad</Text>
          <Ionicons name="alert-circle-outline" size={20} color={COLORS.ORANGE} style={{marginLeft: 175, paddingTop: 17}}/>
          <View style={styles.flecha}>
          
          
          
            <Ionicons name="chevron-forward-outline" size={20} color={COLORS.GRAY_EXTRA_SOFT} />
         </View>
          
        </View>

      </TouchableOpacity>
      <TouchableOpacity style={styles.izq}>
        <View style={styles.account}>
          <View style={styles.squareB}>
            <Ionicons name="notifications-outline" size={20} color={COLORS.GRAY_EXTRA_SOFT} />
          </View>
          <Text style={styles.texto}>Notificaciones</Text>
          <View style={styles.flecha}>
            <Ionicons name="chevron-forward-outline" size={20} color={COLORS.GRAY_EXTRA_SOFT} />
          </View>
        </View>

      </TouchableOpacity>
      <TouchableOpacity style={styles.izq}>
        <View style={styles.account}>
          <View style={styles.squareB}>
            <Ionicons name="help-circle-outline" size={20} color={COLORS.GRAY_EXTRA_SOFT} />
          </View>
          <Text style={styles.texto}>Ayuda y Soporte</Text>
          <View style={styles.flecha}>
            <Ionicons name="chevron-forward-outline" size={20} color={COLORS.GRAY_EXTRA_SOFT} />
          </View>
        </View>

      </TouchableOpacity>
      <TouchableOpacity style={styles.izq}>
        <View style={styles.account}>
          <View style={styles.squareB}>
            <Ionicons name="chatbox-ellipses-outline" size={20} color={COLORS.GRAY_EXTRA_SOFT} />
          </View>
          <Text style={styles.texto}>Realimentación</Text>
          <View style={styles.flecha}>

            <Ionicons name="chevron-forward-outline" size={20} color={COLORS.GRAY_EXTRA_SOFT} />
          </View>
        </View>

      </TouchableOpacity>






      <TouchableOpacity onPress={() => logout()} style={styles.logoutButton}>
      <Ionicons name="log-out-outline" size={20} color="white" />
        <Text style={styles.logoutButtonText}> Cerrar Sesión</Text>
      </TouchableOpacity>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },

  section: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    fontSize: 20
  },
  account: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 30


  },

  tit: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.GRAY_EXTRA_SOFT,
    marginTop: 15,
    alignSelf: 'flex-start',
    marginLeft: 30
  },
  square: {
    marginTop: "4%",
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: COLORS.ORANGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,

  },
  texto: {
    padding: 20,
    color: COLORS.GRAY_SOFT
  },


  flecha: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 20,
  },
  flecha1: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginLeft: 110,
    alignItems: 'center',

  },
  flecha2:{
flexDirection: 'row',

  },
  
  line: {
    width: width * 0.9,
    borderWidth: 1,
    borderColor: '#DEE1E6FF',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  squareA: {
    marginTop: "4%",
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: COLORS.GRAY_EXTRA_SOFT,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,

  },
  squareB: {
    marginTop: "4%",
    width: 40,
    height: 40,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: COLORS.GRAY

  },
  izq: {
    alignSelf: 'flex-start',

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
    flexDirection: 'row',
    backgroundColor: COLORS.ORANGE,
    width: '90%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    marginTop: 30,
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
