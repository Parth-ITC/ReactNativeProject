import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ListScreen from '../screens/ListScreen';
import {useDrawerStatus} from '@react-navigation/drawer';
import Dashboard from '../screens/Tab/Dashboard';
import Settings from '../screens/Tab/Settings';
import Profile from '../screens/Tab/Chat';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Chat from '../screens/Tab/Chat';
const Tab = createBottomTabNavigator();

const TabNav = props => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{headerShown: false, tabBarActiveTintColor: '#6C22A6'}}>
      <Tab.Screen
        name="Dashboard"
        component={Dashboard} 
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={Chat}
        options={{
          tabBarLabel: 'Chat',
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="chat" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Settings}
        options={{
          tabBarLabel: 'Setting',
          tabBarIconStyle: {},
          tabBarIcon: ({color, size}) => (
            <MaterialCommunityIcons name="cog" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
