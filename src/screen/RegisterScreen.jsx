import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, Pressable, TouchableOpacity } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useTogglePasswordVisibility } from '../hooks/useTogglePassVisibility'
import { Icon, CheckBox } from 'react-native-elements'
import { COLORS } from '../constants'

export default function RegisterScreen({ setRegisterUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSelected, setSelection] = useState(true)
  const toggleCheckbox = () => setSelection(!isSelected)

  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility()

  const handleRegister = () => {
    console.log('Registrarse')
    console.log({ email, password })
  }

  return (
    // Contenedor general
    <View style={styles.container}>
      <Text style={{ color: 'black', fontSize: 32, fontWeight: 'bold', marginBottom: '10%' }}>Registrarse</Text>

      <View style={styles.form}>

        <Text style={{ fontWeight: 'bold' }}>Usuario</Text>
        <View style={styles.inputContainer}>
          <FontAwesome style={styles.searchIcon} name='user-o' size={20} color='black' />
          <TextInput style={styles.input} placeholder='Ingrese su nombre de usuario' onChangeText={(text) => setEmail(text)} value={email} />
        </View>
      

        <Text style={{ fontWeight: 'bold' }}>Correo</Text>
        <View style={styles.inputContainer}>
          <Icon style={styles.searchIcon} name='mail-outline' />
          <TextInput style={styles.input} placeholder='Ingrese su correo' onChangeText={(text) => setEmail(text)} value={email} />
        </View>

        <Text style={{ fontWeight: 'bold', marginTop: '3%' }}>Contraseña</Text>
        <View style={styles.inputContainer}>
          <Icon style={styles.searchIcon} name='lock-open' />
          <TextInput
            id='clave1'
            style={styles.input}
            placeholder='Ingrese su contraseña'
            autoCapitalize='none'
            autoCorrect={false}
            secureTextEntry={passwordVisibility}
            enablesReturnKeyAutomatically
            onChangeText={text => setPassword(text)}
          />
          <Pressable onPress={handlePasswordVisibility}>
            <MaterialCommunityIcons name={rightIcon} size={22} style={styles.icono} color='#232323' />
          </Pressable>
        </View>


        <View style={styles.condiciones}>
          <CheckBox
            checked={isSelected}
            onPress={toggleCheckbox}
            iconType='material-community'
            checkedIcon='checkbox-marked'
            uncheckedIcon='checkbox-blank-outline'
            checkedColor={COLORS.ORANGE}
            style={styles.checkbox}
          />
          <Text style={{ paddingTop: 17, marginLeft: -15, marginRight: "20%" }}>
            Al registrarme, acepto los <Text style={{ color: COLORS.ORANGE, fontWeight: 'bold' }}>términos de uso</Text> y la <Text style={{ color: COLORS.ORANGE, fontWeight: 'bold' }}>política de privacidad</Text>
          </Text>

        </View>
        <TouchableOpacity style={styles.bregistrarse} onPress={() => handleRegister()}>
          <Text style={{ color: "white" }}>
            Registrarse
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.final}>
        <Text>¿Ya tienes una cuenta? </Text>
        <Text onPress={() => setRegisterUser(false)} style={styles.registrar}>Iniciar Sesión</Text>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
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
  condiciones: {
    marginLeft: -20,
    flexDirection: 'row'
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
  checkbox: {
    paddingRight: 0
  },
  bregistrarse: {
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
  buttonWrapper: {
    marginRight: 25,
    borderRadius: 20
  },
  final: {
    flexDirection: 'row',
    marginTop: '20%',
    position: 'absolute',
    bottom: 0
  },
  registrar: {
    fontWeight: 'bold',
    color: COLORS.ORANGE
  }
})
