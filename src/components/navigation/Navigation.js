import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import HomeScreen from '../home/HomeScreen';
import ProfileScreen from '../home/ProfileScreen';
import SearchScreen from '../home/SearchScreen';
import RecorderScreen from '../home/RecorderScreen';
import UploadScreen from '../home/UploadScreen';

import { 
  homeScreenName, 
  profileScreenName, 
  recorderScreenName, 
  searchScreenName, 
  uploadScreenName 
} from '../../constants';

const Tab = createBottomTabNavigator();

const getIconName = (routeName, focused) => {
  switch (routeName) {
    case homeScreenName:
      return focused ? 'home' : 'home-outline';
    case searchScreenName:
      return focused ? 'search' : 'search-outline';
    case recorderScreenName:
      return 'mic';
    case uploadScreenName:
      return focused ? 'cloud-upload' : 'cloud-upload-outline';
    case profileScreenName:
      return focused ? 'person' : 'person-outline';
    default:
      return '';
  }
}

const renderTabBarIcon = ({ route, focused, color, size }) => {
  const iconName = getIconName(route.name, focused);
  const isRecorderScreen = route.name === recorderScreenName;

  return (
    <Ionicons
      name={iconName}
      size={isRecorderScreen ? 35 : size}
      color={isRecorderScreen ? '#FFFFFF' : color}
      style={isRecorderScreen && styles.recorderIcon}
    />
  );
};

const Navigation = () => {
  return (
    <Tab.Navigator
      initialRouteName={homeScreenName}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#323842FF',
        tabBarStyle: styles.tabBarStyle,
        tabBarIcon: ({ focused, color, size }) =>
          renderTabBarIcon({ route, focused, color, size }),
      })}

    >
      <Tab.Screen name={homeScreenName} component={HomeScreen} />
      <Tab.Screen name={searchScreenName} component={SearchScreen} />
      <Tab.Screen name={recorderScreenName} component={RecorderScreen} />
      <Tab.Screen name={uploadScreenName} component={UploadScreen} />
      <Tab.Screen name={profileScreenName} component={ProfileScreen} />

    </Tab.Navigator>
  );
};

export default Navigation

const styles = StyleSheet.create({
  recorderIcon: {
    borderRadius: 35,
    backgroundColor: '#FF7700FF',
    padding: 5,
  },
  tabBarStyle: {
    height: 70,
    borderTopWidth: 0,
    position: 'absolute',
    borderTopWidth: 0,
    bottom: 0,
    elevation: 0,
  },
});