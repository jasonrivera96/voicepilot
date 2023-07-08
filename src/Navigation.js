import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from './components/userScreens/HomeScreen';
import FilesScreen from './components/userScreens/FilesScreen';
import ProfileScreen from './components/userScreens/ProfileScreen';

const Tab = createBottomTabNavigator();

const homeScreenName = 'Home';
const filesScreenName = 'Files';
const profileScreenName = 'Profile';

const Navigation = () => {
  return (
      <Tab.Navigator
        initialRouteName={homeScreenName}
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            let rn = route.name;

            if(rn === homeScreenName){
              iconName = focused ? 'home' : 'home-outline';
            }else if (rn === filesScreenName){
              iconName = focused ? 'document' : 'document-outline';
            }else if (rn === profileScreenName){
              iconName = focused ? 'person' : 'person-outline';
            }

            return <Ionicons name={iconName} size={size} color={color}/>
          },
        })}
        
        tabBarOtions={{
          activeTintColor: 'blue',
          inactiveTintColor: 'grey',
          labelStyle: {
            paddingBottom: 10,
            fontSize: 10
          },
          style: {
            padding: 10,
            height: 70
          }
        }}
      
      >

        <Tab.Screen name={filesScreenName} component={FilesScreen} />
        <Tab.Screen name={homeScreenName} component={HomeScreen} />
        <Tab.Screen name={profileScreenName} component={ProfileScreen} />
      
      </Tab.Navigator>
  );
};

export default Navigation