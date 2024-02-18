import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  return (
    <Stack.Navigator initialRouteName='SignUp' screenOptions={navigationOptions}>
      <Stack.Group>
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={SignUp} name="SignUp" />

      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
