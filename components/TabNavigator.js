import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Home from './Home';
import ProfileScreen from './ProfileScreen';
import ScanScreen from './ScanScreen';

const Tab = createBottomTabNavigator();

const opt = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    backgroundColor: '#7ed6df',
    position: 'absolute',
    bottom: 16,
    right: 16,
    left: 16,
    borderRadius: 16,
    elevation: 10,
  },
  tabBarInactiveTintColor: '#dff9fb',
  tabBarActiveTintColor: '#f0932b',
};

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={opt} initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="qrcode" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
