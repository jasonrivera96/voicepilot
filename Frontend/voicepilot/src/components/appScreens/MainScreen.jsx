import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';

const MainScreen = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordconfirmation, setPasswordConfirmation] = useState('');

  const handleToggleForm = () => {
    setShowLogin(!showLogin);
  };

  const handleLogin = () => {
    // Lógica para hacer el login
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleForgotPassword = () => {
    // Lógica para recuperar contraseña
  };

  const handleSignUp = () => {
    // Lógica para registrarse
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm password:', passwordconfirmation);
  };

  return (
    <View style={styles.container}>
    <View style={styles.contentContainer}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, showLogin ? styles.activeButton : null]}
          onPress={handleToggleForm}
        >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, !showLogin ? styles.activeButton : null]}
          onPress={handleToggleForm}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
      {showLogin ? (
        <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome Back! :D</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
            <Text style={styles.submitButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.formContainer}>
        <Text style={styles.title}>Welcome! :D</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              secureTextEntry
              value={passwordconfirmation}
              onChangeText={setPasswordConfirmation}
            />
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleSignUp}>
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
      <View style={styles.footer}>
        <Text style={styles.copyright}>© 2023 UCE. All rights reserved.</Text>
        <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL('https://www.instagram.com')}>
                <Ionicons name="logo-instagram" size={11} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL('https://www.github.com')}>
                <Ionicons name="logo-github" size={11} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL('https://www.facebook.com')}>
                <Ionicons name="logo-facebook" size={11} color="#000" />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: '#eee',
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  formContainer: {},
  inputContainer: {
    marginBottom: 7,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  submitButton: {
    height: 40,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  
  footer: {
    width: '100%',
    backgroundColor: '#f2f2f2',
    paddingVertical: 7,
    alignItems: 'center',
    borderRadius: 11,
  },
  copyright: {
    fontSize: 9,
    color: '#777',
    marginBottom: 8,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    paddingTop: Constants.statusBarHeight,
  },
});

export default MainScreen;
