import React, { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { AuthContext } from '../context/AuthContext'
// Dome
import { CheckBox, Icon } from 'react-native-elements'
import { useTogglePasswordVisibility } from '../hooks/useTogglePassVisibility'
import { COLORS } from '../constants'

export default function LoginScreen({ setRegisterUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useContext(AuthContext)

  const [isSelected, setSelection] = useState(true)
  const toggleCheckbox = () => setSelection(!isSelected)

  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility()

  return (
    // Contenedor general
    <View style={styles.container}>
      <Text style={{ color: 'black', fontSize: 32, fontWeight: 'bold', marginBottom: '10%' }}>Iniciar Sesión</Text>

      <View style={styles.form}>

        <Text style={{ fontWeight: 'bold' }}>Correo</Text>
        <View style={styles.inputContainer}>
          <Icon style={styles.searchIcon} name='mail-outline' />
          <TextInput style={styles.input} placeholder='Ingrese su correo' onChangeText={(text) => setEmail(text)} value={email} />
        </View>

        <Text style={{ fontWeight: 'bold', marginTop: '3%' }}>Contraseña</Text>
        <View style={styles.inputContainer}>
          <Icon style={styles.searchIcon} name='lock-open' />
          <TextInput
            style={styles.input}
            placeholder='Ingrese su contraseña'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            value={password}
            enablesReturnKeyAutomatically
            onChangeText={text => setPassword(text)}
          />
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons name={rightIcon} size={22} style={styles.icono} color='#232323' />
          </Pressable>
        </View>
        {/* Contenedor Recuerdame */}
        <View style={styles.recuerdo}>
          <CheckBox
            checked={isSelected}
            onPress={toggleCheckbox}
            iconType='material-community'
            checkedIcon='checkbox-marked'
            uncheckedIcon='checkbox-blank-outline'
            checkedColor={COLORS.ORANGE}
            style={styles.checkbox}
          />
          <Text style={{ paddingTop: 17, marginLeft: -15 }}>Recuérdame</Text>
          <Text style={{ color: '#E46B00FF', padding: 17, marginLeft: "7%" }}>Olvidaste tu contraseña?</Text>

        </View>
        <TouchableOpacity style={styles.biniciar} onPress={() => login({ username: email, password })}>
          <Text style={{ color: "white" }}>Iniciar Sesión</Text>
        </TouchableOpacity>
      </View>
      {/* Iniciar sesion con redes sociales */}
      <Text style={{ alignItems: 'center', marginTop: '10%' }}>O iniciar sesión con</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonWrapperg}>
          <FontAwesome name='google' size={24} color='#C71610FF' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrapperf}>
          <FontAwesome name='facebook' size={24} color='#335CA6FF' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonWrappera} >
          <FontAwesome name='apple' size={24} color='#565E6CFF' />
        </TouchableOpacity>


      </View>
      {/* Ingresar a registro */}
      <View style={styles.final}>
        <Text>No tienes una cuenta? </Text>
        <Text onPress={() => setRegisterUser(true)} style={styles.registrar}>Registrarse</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    marginTop: "30%",
    alignItems: 'center',
    backgroundColor: 'white',
    width: '100%'
  },
  form: {
    gap: 10,
    width: '75%'
  },
  inputContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 4,
    borderWidth: 1
  },
  icono: {
    marginTop: '50%',
    marginRight: '3%'
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: '#fff'

  },
  recuerdo: {
    marginLeft: -20,
    flexDirection: 'row'
  },
  checkbox: {
    paddingRight: 0
  },
  biniciar: {
    width: "90%",
    backgroundColor: COLORS.ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: "5%",
    borderRadius: 4,
    alignSelf: 'center', // Agregado para centrar horizontalmente
    marginVertical: 10,

  },
  searchIcon: {
    padding: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '3%'

  },
  buttonWrapperg: {
    backgroundColor: "#FEF1F1FF",
    alignItems: 'center',
    padding: "2%",
    width: "18%",
    marginRight: 10,
    borderRadius: 20
  },
  buttonWrappera: {
    backgroundColor: "#F3F4F6FF",
    alignItems: 'center',
    padding: "2%",
    width: "18%",
    marginRight: 10,
    borderRadius: 20
  },
  buttonWrapperf: {
    backgroundColor: "#F3F6FBFF",
    alignItems: 'center',
    padding: "2%",
    width: "18%",
    marginRight: 10,
    borderRadius: 20
  },
  final: {
    flexDirection: 'row',
    marginTop: '20%',
    bottom: 0
  },
  registrar: {
    fontWeight: 'bold',
    color: COLORS.ORANGE
  }
})
