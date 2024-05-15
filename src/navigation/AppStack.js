import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../screen/WelcomeScreen';
import HomeScreen from '../screen/HomeScreen';
import ExpenseFormScreen from '../screen/ExpenseFormScreen';
import SeeAllScreen from '../screen/SeeAllScreen';
import TransactionScreen from '../screen/TransactionScreen';
import SplashScreenComponent from '../screen/SplashScreenComponent';
import UserNameScreen from '../screen/UserNameScreen';

const AppStack = () => {
  const Stack = createNativeStackNavigator();
  const transitionSpec = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          transitionSpec: {open: transitionSpec, close: transitionSpec},
        }}>
        <Stack.Screen
          name="Splash"
          component={SplashScreenComponent}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Username" component={UserNameScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ExpenseForm" component={ExpenseFormScreen} />
        <Stack.Screen name="SeeAll" component={SeeAllScreen} />
        <Stack.Screen name="Transaction" component={TransactionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppStack;
