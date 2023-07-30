import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeScreen from '../screen/home/HomeScreen'
import { COLORS, homeScreenName, homeStackName, summaryItemScreenName, summaryScreenName } from '../constants'
import SummaryScreen from '../screen/summary/SummaryScreen'
import SummaryItemScreen from '../screen/summary/SummaryItemScreen'
import { AppProvider } from '../context/AppContext'; // Importar AppProvider desde el contexto

const HomeStackNavigator = createStackNavigator()

const HomeStack = () => {
  return (
    <AppProvider>
      <HomeStackNavigator.Navigator
        initialRouteName={homeScreenName}
        screenOptions={(router) => ({
          headerShown: false,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          cardStyle: { backgroundColor: 'transparent' },
          transitionSpec: {
            open: { animation: 'timing', config: { duration: 200 } },
            close: { animation: 'timing', config: { duration: 200 } }
          }
        })}
      >
        <HomeStackNavigator.Screen
          name={homeStackName}
          component={HomeScreen}
        />
        <HomeStackNavigator.Screen
          name={summaryScreenName}
          component={SummaryScreen}
          options={{
            headerBackTitleVisible: false,
            headerShown: true,
            headerTitle: 'Portafolio',
            headerStyle: {
              backgroundColor: COLORS.WHITE,
              shadowColor: 'transparent'
            }
          }}
        />
        <HomeStackNavigator.Screen
          name={summaryItemScreenName}
          component={SummaryItemScreen}
          options={{
            headerBackTitleVisible: false,
            headerShown: true,
            headerTitle: 'Resúmenes',
            headerStyle: {
              backgroundColor: COLORS.WHITE,
              shadowColor: 'transparent'
            }
          }}
        />
      </HomeStackNavigator.Navigator>
    </AppProvider>
  );
};

export default HomeStack;