import React, { useContext, useState } from 'react'
import { View, Text, TextInput, StyleSheet, Pressable } from 'react-native'
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'
import { AuthContext } from '../context/AuthContext'
// Dome
import { Button } from '@rneui/themed'
import { CheckBox, Icon } from 'react-native-elements'
import { useTogglePasswordVisibility } from '../hooks/useTogglePassVisibility'

export default function LoginScreen ({ setRegisterUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { login } = useContext(AuthContext)

  const [isSelected, setSelection] = useState(false)
  const toggleCheckbox = () => setSelection(!isSelected)

  const { passwordVisibility, rightIcon, handlePasswordVisibility } = useTogglePasswordVisibility()

  return (
  // Contenedor general
    <View style={styles.container}>
      <Text style={{ color: 'black', fontSize: 32, fontWeight: 'bold' }}>Iniciar Sesión</Text>

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
            checkedColor='#E46B00FF'
            style={styles.checkbox}
          />
          <Text style={{ paddingTop: 17, marginLeft: -15 }}>Recuérdame</Text>
          <Text style={{ color: '#E46B00FF', padding: 17, marginLeft: 35 }}>Olvidaste tu contraseña?</Text>

        </View>
        <Button color='#E46B00FF' onPress={() => login({ username: email, password })}>Iniciar Sesión</Button>
      </View>
      {/* Iniciar sesion con redes sociales */}
      <Text style={{ alignItems: 'center', marginTop: '5%' }}>O iniciar sesión con</Text>
      <View style={styles.buttonContainer}>
        <Button radius='sm' type='solid' color='#E7F1F8'>
          <Icon name='facebook' color='darkblue' />
        </Button>
        <Button radius='sm' type='solid' color='#F8E7E8'>
          <FontAwesome name='google' size={24} color='red' />
        </Button>
      </View>
      {/* Ingresar a registro */}
      <View style={styles.final}>
        <Text>No tienes una cuenta?</Text>
        <Text onPress={() => setRegisterUser(true)} style={styles.registrar}>Registrarse</Text>
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
  recuerdo: {
    marginLeft: -20,
    flexDirection: 'row'
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
  },
  final: {
    flexDirection: 'row',
    marginTop: '20%'
  },
  registrar: {
    fontWeight: 'bold',
    color: '#E46B00FF'
  }
})
