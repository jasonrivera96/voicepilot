import React from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS } from '../constants'
import { FontAwesome } from '@expo/vector-icons'
import Constants from 'expo-constants'

const RegisterScreen = ({ setRegisterUser }) => {
  const handleRegister = () => {
    // Aquí puedes implementar la lógica de registro
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput style={styles.input} placeholder='Ingrese su nombre' />
        <Text style={styles.label}>Correo electrónico</Text>
        <TextInput style={styles.input} placeholder='email@example.com' />
        <Text style={styles.label}>Contraseña</Text>
        <View style={styles.passwordInputContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder='Ingrese su contraseña'
          />
        </View>
      </View>
      <TouchableOpacity style={styles.acceptPolicy}>
        <FontAwesome name='check' size={18} color={COLORS.ORANGE} />
        <Text style={styles.rememberPasswordText}>
          Por registrarme, Acepto todos los
          <Text style={styles.policyText}>Términos de uso </Text>
          &
          <Text style={styles.policyText}> Políticas de Privacidad</Text>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Registrarse</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text>¿Ya tienes una cuenta? </Text>
        <Text onPress={() => setRegisterUser(false)} style={styles.loginText}>Inicia sesión</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    marginTop: 150,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    marginBottom: 24
  },
  inputContainer: {
    width: '90%',
    marginTop: 30
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.GRAY_SOFT
  },
  input: {
    height: 48,
    backgroundColor: '#F3F4F6FF',
    marginBottom: 16,
    paddingHorizontal: 12,
    borderRadius: 8
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  passwordInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#F3F4F6FF',
    paddingHorizontal: 12,
    borderRadius: 8
  },
  eyeIconContainer: {
    marginHorizontal: 12
  },
  registerButton: {
    backgroundColor: COLORS.ORANGE,
    width: '90%',
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16
  },
  loginContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 150
  },
  loginText: {
    color: COLORS.ORANGE,
    fontWeight: 'bold'
  },
  policyText: {
    color: COLORS.ORANGE
  },
  acceptPolicy: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 50,
    marginBottom: 30
  },
  rememberPasswordText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#000'
  }
})

export default RegisterScreen
