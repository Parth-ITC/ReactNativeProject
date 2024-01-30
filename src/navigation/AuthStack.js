import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen component={Login} name="Login" />
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
