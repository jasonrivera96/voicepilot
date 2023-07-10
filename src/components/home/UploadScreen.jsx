import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from "expo-constants";

const UploadScreen = () => {
  
  return (
    <View style={styles.container}>

      <View style={styles.body}>
        <Text style={styles.description}>Upload screen.</Text>
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

export default UploadScreen