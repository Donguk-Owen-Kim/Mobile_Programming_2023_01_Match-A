import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Image } from 'react-native';

import JoinScreen from './JoinScreen';
import MessageScreen from './MessageScreen';
import SettingScreen from './SettingScreen';
import SymptomsScreen from './components/symptom'

const Tab = createBottomTabNavigator();

const joinIcon = require('../join.jpeg');  // Update the path accordingly

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let component;

            if (route.name === 'Join') {
              component = <Image source={joinIcon} style={{ width: 50, height: 50, tintColor: focused ? 'green' : 'gray' }} />;
            } else if (route.name === 'Message') {
              component = <Icon name={focused ? 'chatbox' : 'chatbox-outline'} size={size} color={color} />;
            } else if (route.name === 'Setting') {
              component = <Icon name={focused ? 'settings' : 'settings-outline'} size={size} color={color} />;
            } else if (route.name === 'Symptom') {
              component = <Icon name={focused ? 'medical' : 'medical-outline'} size={size} color={color} />;
            }

            return component;
          },
          tabBarActiveTintColor: 'green',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Join" component={JoinScreen} />
        <Tab.Screen name="Message" component={MessageScreen} />
        <Tab.Screen name="Setting" component={SettingScreen} />
        <Tab.Screen name="Symptoms" component={SymptomsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}