import { useEffect, useState } from 'react';
import { Appearance, StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation';
import MainScreen from './src/components/navigation/MainScreen';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [statusBarColor, setStatusBarColor] = useState('dark');
  const currentColorScheme = Appearance.getColorScheme();

  useEffect(() => {
    const changeStatusBarColor = async () => {
      NavigationBar.setBackgroundColorAsync('#FFFFFF');
      NavigationBar.setButtonStyleAsync("dark");
    }
    changeStatusBarColor();
  }, []);

  return (
    // <View style={styles.container}>
    //   <MainScreen/>
    // </View>
    <NavigationContainer>
      <StatusBar style={statusBarColor} />
      <Navigation/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
