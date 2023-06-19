import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserSelection from './UserSelection';
import Main from './Main';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserSelection">
        <Stack.Screen name="UserSelection" component={UserSelection} options={{ title: 'Select User Type' }}/>
        <Stack.Screen name="Main" component={Main} options={{ title: 'Main' }}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}