import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNav, {DeepScreen} from './Drawer';
import DetailsScreen from '../screens/DetailsScreen';
import ListScreen from '../screens/ListScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import MapScreen from '../screens/MapScreen';
import MessageScreen from '../screens/Tab/Chat/Message';
const Stack = createNativeStackNavigator();

const AppStack = () => {

  const navigationOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator initialRouteName='Dash' screenOptions={navigationOptions}>
      <Stack.Screen component={DrawerNav} name="Dash" />
      <Stack.Screen component={ListScreen} name="List" />
      <Stack.Screen component={DetailsScreen} name="Details" />
      <Stack.Screen component={CartScreen} name="Cart" />
      <Stack.Screen component={ProfileScreen} name="ProfileScreen" />
      <Stack.Screen component={MapScreen} name="MapScreen" />
      <Stack.Screen component={MessageScreen} name="MessageScreen" />

      


    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
