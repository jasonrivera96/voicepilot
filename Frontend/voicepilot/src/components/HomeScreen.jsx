import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Constants from "expo-constants";
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  /* const navigation = useNavigation(); */

  const handleLoginPress = () => {
    /* navigation.navigate('Login'); */
  };

  const handleSignInPress = () => {
    /* navigation.navigate('Sign In'); */
  };
  
  return (
    <View style={styles.container}>
      
      <View style={styles.header}>
        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.button}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignInPress}>
          <Text style={styles.button}>Sign In</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.body}>
        <Text style={styles.description}>Hi! Welcome to VoicePilot! :D</Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.copyright}>© 2023 UCE. All rights reserved.</Text>
        <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL('https://www.instagram.com')}>
                <Ionicons name="logo-instagram" size={17} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL('https://www.github.com')}>
                <Ionicons name="logo-github" size={17} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer} onPress={() => Linking.openURL('https://www.facebook.com')}>
                <Ionicons name="logo-facebook" size={17} color="#000" />
            </TouchableOpacity>
        </View>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Constants.statusBarHeight,
  },
  button: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    color: '#555',
  },
  footer: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 16,
    paddingHorizontal: 16,
    alignItems: 'center',
    borderRadius: 15,
  },
  copyright: {
    fontSize: 12,
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
});

export default HomeScreen