import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListScreen from '../screens/ListScreen';
import {useDrawerStatus} from '@react-navigation/drawer';
import Dashboard from '../screens/Tab/Dashboard';
import Settings from '../screens/Tab/Settings';
import Profile from '../screens/Tab/Profile';

const Tab = createBottomTabNavigator();

const TabNav = props => {
  return (
    <Tab.Navigator initialRouteName='Profile' screenOptions={{headerShown: false}}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Setting" component={Settings} />
    </Tab.Navigator>
  );
};

export default TabNav;
