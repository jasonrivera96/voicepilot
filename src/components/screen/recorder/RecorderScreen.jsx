import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Constants from "expo-constants";

const RecorderScreen = () => {
  
  return (
    <View style={styles.container}>
      <View>
        <Text>Recorder Screen</Text>
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

  export default RecorderScreen;