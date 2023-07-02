import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/Navigation';
import MainScreen from './src/components/appScreens/MainScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <MainScreen/>
    </View>
    /*<NavigationContainer>
      <Navigation/>
    </NavigationContainer>*/
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
