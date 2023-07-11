import React, { useContext, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import { COLORS } from '../constants'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { AuthContext } from '../context/AuthContext'

const LoginScreen = ({ setRegisterUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useContext(AuthContext)
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Usuario</Text>
        <TextInput onChangeText={(value) => setUsername(value)} style={styles.input} placeholder='Ingresa tu usuario' />
        <Text style={styles.label}>Contraseña</Text>
        <TextInput onChangeText={(value) => setPassword(value)} style={styles.input} placeholder='Ingresa tu contraseña' secureTextEntry />
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.rememberPasswordContainer}>
          <FontAwesome name='check' size={18} color={COLORS.ORANGE} />
          <Text style={styles.rememberPasswordText}>Recuérdame</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.restablecerContrasenaContainer}>
          <Text style={styles.registerText}>¿Olvidaste tu contraseña?</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={() => login({ username, password })}>
        <Text style={styles.loginButtonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <View style={styles.separatorContainer}>
        <Text style={styles.separatorText}>O Inicia Sesión con</Text>
      </View>
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.socialLoginButton}>
          <FontAwesome name='facebook' size={24} color='#3b5998' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialLoginButton}>
          <AntDesign name='google' size={24} color='#db4a39' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.socialLoginButton}>
          <FontAwesome name='apple' size={24} color='#000000' />
        </TouchableOpacity>
      </View>
      <View style={styles.registerContainer}>
        <Text>¿No tienes una cuenta?
          <Text onPress={() => setRegisterUser(true)} style={[styles.registerText, { fontWeight: 'bold' }]}> Regístrate</Text>
        </Text>
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
  loginButton: {
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
  loginButtonText: {
    color: '#fff',
    fontSize: 16
  },
  separatorContainer: {
    marginTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  separatorText: {
    marginHorizontal: 8,
    fontSize: 14,
    color: COLORS.GRAY_EXTRA_SOFT
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16
  },
  socialLoginButton: {
    backgroundColor: '#F3F4F6FF',
    width: 78,
    height: 38,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8
  },
  bottomContainer: {
    flexDirection: 'row',
    width: '90%',
    marginBottom: 30
  },
  rememberPasswordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16
  },
  rememberPasswordText: {
    marginLeft: 8,
    fontSize: 14,
    color: COLORS.GRAY_EXTRA_SOFT
  },
  restablecerContrasenaContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  registerText: {
    fontSize: 14,
    color: COLORS.ORANGE
  },
  registerContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    marginTop: 110
  }
})

export default LoginScreen
