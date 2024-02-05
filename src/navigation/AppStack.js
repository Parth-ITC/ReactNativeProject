import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawerNav, {DeepScreen} from './Drawer';
import DetailsScreen from '../screens/DetailsScreen';
import ListScreen from '../screens/ListScreen';
const Stack = createNativeStackNavigator();

const AppStack = () => {
  const navigationOptions = {
    headerShown: false,
  };
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen component={DrawerNav} name="Dash" />
      <Stack.Screen component={ListScreen} name="List" />
      <Stack.Screen component={DetailsScreen} name="Details" />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
