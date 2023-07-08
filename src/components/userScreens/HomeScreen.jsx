import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from "expo-constants";

const HomeScreen = () => {
  
  return (
    <View style={styles.container}>

      <View style={styles.body}>
        <Text style={styles.description}>First screen after login.</Text>
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