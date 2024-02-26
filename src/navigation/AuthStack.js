import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/Auth/Login';
import SignUp from '../screens/Auth/SignUp';
import FirebaseSignup from '../screens/Auth/FirebaseSignup';
import FirebaseLogin from '../screens/Auth/FirebaseLogin';
const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const navigationOptions = {
    headerShown: false,
    gestureEnabled: false,
  };
  return (
    <Stack.Navigator initialRouteName='FirebaseLogin' screenOptions={navigationOptions}>
      <Stack.Group>
        <Stack.Screen component={Login} name="Login" />
        <Stack.Screen component={SignUp} name="SignUp" />
        <Stack.Screen component={FirebaseSignup} name="FirebaseSignUp" />
        <Stack.Screen component={FirebaseLogin} name="FirebaseLogin" />

      </Stack.Group>
    </Stack.Navigator>
  );
};

export default AuthStack;

const styles = StyleSheet.create({});
