import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import ListScreen from '../screens/ListScreen';
import CustumDrawer from '../components/CustumDrawer';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TabNav from './TabNav';
const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export const DeepScreen = props => {
  return <View style={{flex: 1, backgroundColor: 'pink'}}></View>;
};



const DrawerNav = props => {
  return (
    <Drawer.Navigator
    initialRouteName='Tab'
      screenOptions={{headerShown: false, drawerType: 'front'}}
      drawerContent={CustumDrawer}>
      <Drawer.Screen name="Tab"  component={TabNav} />
      <Drawer.Screen name="DeepScreen"  component={DeepScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
