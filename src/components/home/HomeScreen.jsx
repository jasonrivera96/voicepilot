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
    backgroundColor: '#fff',
  }
});

export default HomeScreen