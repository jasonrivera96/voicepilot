import React, { useState } from 'react'
import { Button } from '@rneui/themed'
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { useTogglePasswordVisibility } from '../hooks/useTogglePassVisibility'
import { Icon } from 'react-native-elements'

export default function RegisterScreen ({ setRegisterUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility()

  const handleRegister = () => {
    console.log('Registrarse')
    console.log({ email, password })
  }

  return (
  // Contenedor general
    <View style={styles.container}>
      <Text style={{ color: 'black', fontSize: 32, fontWeight: 'bold' }}>Registrarse</Text>

      <View style={styles.form}>

        <Text style={{ fontWeight: 'bold' }}>Correo</Text>
        <View style={styles.inputContainer}>
          <Icon style={styles.searchIcon} name='mail-outline' />
          <TextInput style={styles.input} placeholder='Ingrese su correo' onChangeText={(text) => setEmail(text)} value={email} />
        </View>

        <Text style={{ fontWeight: 'bold' }}>Contraseña</Text>
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

        <Text style={{ fontWeight: 'bold' }}>Confirmación</Text>
        <View style={styles.inputContainer}>
          <Icon style={styles.searchIcon} name='lock-open' />
          <TextInput
            id='clave'
            style={styles.input}
            placeholder='Confirme su contraseña'
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

        <Button color='#E46B00FF' onPress={() => handleRegister()}>Registrarse</Button>
      </View>
      {/* Iniciar sesion con redes sociales */}
      <Text style={{ alignItems: 'center', marginTop: '5%' }}>O Registrarse con</Text>
      <View style={styles.buttonContainer}>
        <Button radius='sm' type='solid' color='#E7F1F8'>
          <Icon name='facebook' color='darkblue' />
        </Button>
        <Button radius='sm' type='solid' color='#F8E7E8'>
          <FontAwesome name='google' size={24} color='red' />
        </Button>
      </View>
      <View>
        <Text>Ya tienes una cuenta</Text>
        <Text onPress={() => setRegisterUser(false)} style={styles.registrar}>Login</Text>
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
    width: '80%'
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
  checkbox: {
    paddingRight: 0
  },
  searchIcon: {
    padding: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
    width: '30%',
    justifyContent: 'space-between'
  }
})
