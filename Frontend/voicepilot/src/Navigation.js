import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './components/HomeScreen';
import LoginScreen from './components/LoginScreen';
import SignInScreen from './components/SignInScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Sign In" component={SignInScreen} />
      </Stack.Navigator>
  );
};

export default Navigation